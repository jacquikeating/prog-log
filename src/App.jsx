import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import OverviewPage from "./pages/OverviewPage/OverviewPage";
import "./styles/index.scss";

function App() {

  // Temporary dummy data 
    const sessionsData = [
        {
            id: 1,
            date: "2026-01-01",
            roster: "Player 1, Player 2, Player 3, Player 4, Player 5, Player 6, Player 7, Player 8",
            prog_phase: 1,
            prog_mech: "Opener",
            fflogs_link: "http://fflogs.com",
            twitch_links: "http://twitch.tv, http://twitch.tv"
        },
        {
            id: 2,
            date: "2026-01-02",
            roster: "Player 1, Player 2, Player 3, Player 4, Player 5, Player 6, Player 7, Player 8",
            prog_phase: 1,
            prog_mech: "Opener",
            fflogs_link: "http://fflogs.com",
            twitch_links: "http://twitch.tv, http://twitch.tv"
        }
    ]; 

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={<OverviewPage sessions={[...sessionsData].reverse()} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;