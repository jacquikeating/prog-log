import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { supabase } from "./supabase-client";
import Header from "./components/Header/Header";
import AboutPage from "./pages/AboutPage/AboutPage";
import AddDataPage from "./pages/AddDataPage/AddDataPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import OverviewPage from "./pages/OverviewPage/OverviewPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ReportPage from "./pages/ReportPage/ReportPage";
import "./styles/index.scss";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [pulls, setPulls] = useState([]);

  async function fetchSessions() {
    const { error, data } = await supabase.from("sessions").select("*")
      .order("num", { ascending: false });
    // Query filter for future reference:
    /* const { error, data } = await supabase.from("sessions")
        .select("*")
        .match({ static: "Wall is Safe", ulti: "umad" })
        .order("num", { ascending: false });
    */
    if (error) { 
      console.error("Error fetching sessions: ", error.message);
      setError(error.message);
    } else {
      setSessions(data);
    }
  }

  async function fetchPulls() {
    const { error, data } = await supabase.from("pulls").select("*")
      .order("pull_num_overall", { ascending: true });
    if (error) { 
      console.error("Error fetching pulls: ", error.message);
      setError(error.message);
    } else {
      setPulls(data);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSessions();
    fetchPulls();
  }, []);

  if (loading) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main>
        <p>Error loading data: {error}</p>
      </main>
    )
  }

  if (sessions.length > 0) {
    return (
      <BrowserRouter>
        <Header latestSession={sessions.length} />
        <Routes>
          <Route 
            path="/" 
            element={<OverviewPage sessions={[...sessions].reverse()} pulls={pulls} />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/add" element={<AddDataPage sessions={[...sessions].reverse()} />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route
              path="/report/:sessionNum"
              element={<ReportPage sessions={sessions} pulls={pulls} />}
            />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;