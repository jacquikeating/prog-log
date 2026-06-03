import { useParams } from "react-router-dom";
import OverviewStats from "../../components/OverviewStats/OverviewStats.jsx";
import PhaseBreakdownTable from "../../components/PhaseBreakdownTable/PhaseBreakdownTable";
import SessionsList from "../../components/SessionsList/SessionsList";

const OverviewPage = ({ sessions, pulls }) => {
    const { staticNick, ulti } = useParams();

    const filteredSessions = sessions.filter((session) => session.static == staticNick && session.ulti.toLowerCase() == ulti );

    return (
        <main className="overview-page">
            <h1 className="overview-page__title">Overview</h1>
            <OverviewStats sessions={filteredSessions} pulls={pulls} />
            <PhaseBreakdownTable
                progPhase={filteredSessions[0].prog_phase}
                pulls={pulls} 
            />
            <SessionsList sessions={filteredSessions} />
        </main>
    );
};

export default OverviewPage;