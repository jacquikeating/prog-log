import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import AboutPage from "./pages/AboutPage/AboutPage";
import OverviewPage from "./pages/OverviewPage/OverviewPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ReportPage from "./pages/ReportPage/ReportPage";
import "./styles/index.scss";

function App() {

  // Temporary dummy data taken from archive 
    const dummySessionsData = [
        {
            id: 1,
            date: "2024-11-26",
            roster: "Chro, Sophia, Ruv, Ella, Quil, Tori, Char, Laveera",
            prog_phase: 1,
            prog_mech: "Opener",
            fflogs_link: "https://www.fflogs.com/reports/Fn6zbtjc2hLpVN9M",
            twitch_links: "https://www.twitch.tv/videos/2312032144, https://www.twitch.tv/videos/2312034395",
            goal: "Die a lot",
            notes: "Unofficial session 0, Chro's VOD is split into multiple parts, Should we even count this session?"
        },
        {
            id: 2,
            date: "2024-12-04",
            roster: "Chro, Sophia, Ruv, Ella, Quil, Hypatia, Char, Laveera",
            prog_phase: 1,
            prog_mech: "Enrage",
            fflogs_link: "https://www.fflogs.com/reports/4W9pdzBFkvZn8CGc",
            twitch_links: "https://www.twitch.tv/videos/2318554836",
            goal: "Clear phase 1 and practice Diamond Dust",
            notes:"First session with the full roster!, I want to clip our pulls at the prog point but we had SO MANY Diamond Dust pulls it got a bit ridiculous"
        }
    ];
    
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

  return (
    <>
      <BrowserRouter>
        <Header latestSession={dummySessionsData.length} />
        <Routes>
          <Route 
            path="/" 
            element={<OverviewPage sessions={[...dummySessionsData].reverse()} pulls={dummyPullsData} />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route
              path="/report/:sessionID"
              element={<ReportPage sessions={dummySessionsData} pulls={dummyPullsData} />}
            />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;