import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { supabase } from "./supabase-client";
import Layout from "./components/Layout/Layout";
import AboutPage from "./pages/AboutPage/AboutPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import AddDataPage from "./pages/AddDataPage/AddDataPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import OverviewPage from "./pages/OverviewPage/OverviewPage";
import ProgPointPage from "./pages/ProgPointPage/ProgPointPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ReportPage from "./pages/ReportPage/ReportPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import "./styles/index.scss";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [pulls, setPulls] = useState([]);
  const [user, setUser] = useState(null);

  async function fetchSessions() {
    const { error, data } = await supabase.from("sessions")
      .select("*")
      .order("num", { ascending: false });
      //  .match({ static: "Wall is Safe", ulti: "umad" })
    if (error) { 
      console.error("Error fetching sessions: ", error.message);
      setError(error.message);
    } else {
      setSessions(data);
    };
  };

  async function fetchPulls() {
    const { error, data } = await supabase.from("pulls")
      .select("*")
      .order("pull_num_overall", { ascending: true });
    if (error) { 
      console.error("Error fetching pulls: ", error.message);
      setError(error.message);
    } else {
      setPulls(data);
      setLoading(false);
    };
  };

  async function checkLogin() {
    const currentLogin = await supabase.auth.getSession();

    if (currentLogin.data.session) {
      let sessionData = currentLogin.data.session;
      let userData = {
        id: sessionData.user.id,
        name: "",
        member_of: "",
        permissions: ""
      };
        
      const { data, error } = await supabase.from("players")
        .select("*")
        .eq('user_id', sessionData.user.id);
        if (error) {
          console.error(error);
          setError(error.message);
        } else {
          userData.name = data[0].name;
          userData.member_of = data[0].member_of;
          userData.permissions = data[0].permissions;
          setUser(userData);
        };
    };
  };

  useEffect(() => {
    fetchSessions();
    fetchPulls();
    checkLogin();
  }, []);

  useEffect(() => {
    const sessionsChannel = supabase
      .channel("sessions_subscription")
      .on("postgres_changes", 
        { event: "INSERT", schema: "public", table: "sessions" }, 
        (payload) => {
          const newSession = payload.new;
          setSessions((prev) => [newSession, ...prev]); 
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(sessionsChannel);
    }

  }, [supabase, sessions]);

  useEffect(() => {
    const pullsChannel = supabase
      .channel("pulls_subscription")
      .on("postgres_changes", 
        { event: "INSERT", schema: "public", table: "pulls" }, 
        (payload) => {
          const newPull = payload.new;
          setPulls((prev) => [...prev, newPull]); 
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(pullsChannel);
    }

  }, [supabase, pulls]);

  if (loading) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    )
  };

  if (error) {
    return (
      <main>
        <p>Error loading data: {error}</p>
      </main>
    )
  };

  if (sessions.length > 0) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout sessions={sessions} pulls={pulls} user={user} setUser={setUser} />}>
            <Route index element={<OverviewPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/add" element={<AddDataPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/prog-point" element={<ProgPointPage />} />
            <Route path="/report/:sessionNum" element={<ReportPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  };
};

export default App;