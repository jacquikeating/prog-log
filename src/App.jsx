import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { supabase } from "./supabase-client";
import Header from "./components/Header/Header";
import AboutPage from "./pages/AboutPage/AboutPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import AddDataPage from "./pages/AddDataPage/AddDataPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import OverviewPage from "./pages/OverviewPage/OverviewPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ReportPage from "./pages/ReportPage/ReportPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import "./styles/index.scss";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [pulls, setPulls] = useState([]);
  const [loginData, setLoginData] = useState(null);

  async function fetchSessions() {
    const { error, data } = await supabase.from("sessions").select("*").order("num", { ascending: false });
    //  // Query filter for future reference:
    //  .match({ static: "Wall is Safe", ulti: "umad" })
    if (error) { 
      console.error("Error fetching sessions: ", error.message);
      setError(error.message);
    } else {
      setSessions(data);
    };
  };

  async function fetchPulls() {
    const { error, data } = await supabase.from("pulls").select("*")
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
    setLoginData(currentLogin.data);
    console.log(currentLogin.data.session);
  };

  useEffect(() => {
    fetchSessions();
    fetchPulls();
    checkLogin();
  }, []);

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
        <Header latestSession={sessions.length} loginData={loginData} />
        <Routes>
          <Route 
            path="/" 
            element={<OverviewPage sessions={sessions} pulls={pulls} />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/account" element={<AccountPage loginData={loginData} />} />
          <Route path="/add" element={<AddDataPage sessions={sessions} prevPulls={pulls} />} />
          <Route path="/admin" element={<AdminPage sessions={sessions} prevPulls={pulls} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
              path="/report/:sessionNum"
              element={<ReportPage sessions={sessions} pulls={pulls} />}
            />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    );
  };
};

export default App;