import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import OverviewStats from "../../components/OverviewStats/OverviewStats.jsx";
import PhaseBreakdownTable from "../../components/PhaseBreakdownTable/PhaseBreakdownTable";
import SessionsList from "../../components/SessionsList/SessionsList";
import Pagination from "../../components/Pagination/Pagination";

const OverviewPage = () => {
    const { sessions, pulls } = useOutletContext();
    const [currentPage, setCurrentPage] = useState(0);

    let startingIndex = 0;
    if (currentPage > 0) {
        startingIndex = currentPage * 10;
    };
    let endingIndex = startingIndex + 10;
    let sessionsToShow = sessions.slice(startingIndex, endingIndex);

    return (
        <main className="overview-page">
            <h1 className="overview-page__title">Overview</h1>
            <OverviewStats sessions={sessions} pulls={pulls} />
            <PhaseBreakdownTable
                progPhase={sessions[0].prog_phase}
                pulls={pulls} 
            />
            <SessionsList sessions={sessionsToShow} />
            <Pagination 
                sessions={sessions} 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage}
            />
        </main>
    );
};

export default OverviewPage;