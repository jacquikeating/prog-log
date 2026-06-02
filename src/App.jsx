import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { supabase } from "./supabase-client";
import Header from "./components/Header/Header";
import AboutPage from "./pages/AboutPage/AboutPage";
import AddDataPage from "./pages/AddDataPage/AddDataPage";
import OverviewPage from "./pages/OverviewPage/OverviewPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ReportPage from "./pages/ReportPage/ReportPage";
import "./styles/index.scss";

function App() {
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [pulls, setPulls] = useState([]);

  async function fetchSessions() {
    const { error, data } = await supabase.from("sessions").select("*");
    // Query filter for future reference:
    /* const { error, data } = await supabase.from("sessions")
        .select("*")
        .eq("static", "Wall is Safe")
        .order("num", { ascending: false });
    */
    if (error) { 
      console.error("Error fetching sessions: ", error.message);
      return;
    } else {
      setSessions(data);
      setLoading(false);
    }
  }

  async function fetchPulls() {
    const { error, data } = await supabase.from("pulls").select("*");
    if (error) { 
      console.error("Error fetching pulls: ", error.message);
      return;
    } else {
      console.log(data);
      setPulls(data);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSessions();
    fetchPulls();
  }, []);

  // Temporary dummy data taken from archive 
    const dummyPullsData = [
      {
        cause: "No tank swap on 1st TB",
        clip_link: "",
        id: 1,
        log_link: "",
        mech: "Utopian Sky",
        notes: "Next auto killed Chro → Chro exploded and killed 3 others",
        phase: "1",
        players_responsible: "Chro, Sophia",
        prog_point_reached: "target",
        pull_num_overall: 1,
        pull_num_today: 1,
        session_id: 1
      },
      {
        cause: "3 people killed by clone lines",
        clip_link: "",
        id: 2,
        log_link: "",
        mech: "Utopian Sky",
        notes: "TB killed both tanks again, but we recovered. Timing or precise positioning in the safe spots got Soph and both RDPS.",
        phase: "1",
        players_responsible: "Chro, Sophia, Char, Laveera",
        prog_point_reached: "target",
        pull_num_overall: 2,
        pull_num_today: 2,
        session_id: 1
      },
      {
        cause: "Char burnt strike; Hypatia wall KB",
        clip_link: "x",
        id: 50,
        log_link: "",
        mech: "Utopian Sky",
        notes: "",
        phase: "1",
        players_responsible: "Hypatia, Char",
        prog_point_reached: "target",
        pull_num_overall: 50,
        pull_num_today: 1,
        session_id: 2
      },
      {
        cause: "Ranged DPS too close on spreads",
        clip_link: "",
        id: 51,
        log_link: "",
        mech: "Opener",
        notes: "",
        phase: "1",
        players_responsible: "Char, Laveera",
        prog_point_reached: "target",
        pull_num_overall: 51,
        pull_num_today: 2,
        session_id: 2
      },
      // {
      //   cause: "",
      //   clip_link: "",
      //   id: ,
      //   log_link: "",
      //   mech: "",
      //   notes: "",
      //   phase: "",
      //   players_responsible: "",
      //   prog_point_reached: "target/cleanup/old",
      //   pull_num_overall: ,
      //   pull_num_today: ,
      //   session_id: 
      // }
    ];

  if (!loading) {
    return (
      <BrowserRouter>
        <Header latestSession={sessions.length} />
        <Routes>
          <Route 
            path="/" 
            element={<OverviewPage sessions={[...sessions].reverse()} pulls={dummyPullsData} />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/add-data" element={<AddDataPage sessions={[...sessions].reverse()} />} />
          <Route
              path="/report/:sessionID"
              element={<ReportPage sessions={sessions} pulls={dummyPullsData} />}
            />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return <p>Loading...</p>
  }
}

export default App;