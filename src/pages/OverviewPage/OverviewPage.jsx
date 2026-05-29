import OverviewStats from "../../components/OverviewStats/OverviewStats.jsx";
import PhaseBreakdownTable from "../../components/PhaseBreakdownTable/PhaseBreakdownTable";
import SessionsList from "../../components/SessionsList/SessionsList";

const OverviewPage = ({ sessions, pulls }) => {
    return (
        <main className="overview-page">
            <h1 className="overview-page__title">Overview</h1>
            <OverviewStats sessions={sessions} pulls={pulls} />
            <PhaseBreakdownTable
                progPhase={sessions[0].prog_phase}
                pulls={pulls} 
            />
            <SessionsList sessions={sessions} />
        </main>
    );
};

export default OverviewPage;