import { useParams } from "react-router-dom";
import OverviewStats from "../../components/OverviewStats/OverviewStats.jsx";
import PhaseBreakdownTable from "../../components/PhaseBreakdownTable/PhaseBreakdownTable";
import SessionsList from "../../components/SessionsList/SessionsList";

const OverviewPage = ({ sessions, pulls }) => {
    const { staticNick, ulti } = useParams();

    const filteredSessions = sessions.filter((session) => session.static == staticNick && session.ulti.toLowerCase() == ulti );
    const filteredPulls = pulls.filter((pull) => pull.static == staticNick && pull.ulti.toLowerCase() == ulti );

    return (
        <main className="overview-page">
            <h1 className="overview-page__title">Overview</h1>
            {filteredSessions.length > 0 && filteredPulls.length > 0 ? (
                <>
                    <OverviewStats sessions={filteredSessions} pulls={filteredPulls} />
                    <PhaseBreakdownTable
                        progPhase={filteredSessions[0].prog_phase}
                        pulls={filteredPulls} 
                    />
                    <SessionsList sessions={filteredSessions} />
                </>
            ) : (
                <p>No data found for this static and ultimate. </p>
            )}
            
        </main>
    );
};

export default OverviewPage;