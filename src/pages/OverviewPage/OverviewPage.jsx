import OverviewStats from "../../components/OverviewStats/OverviewStats.jsx";
import PhaseBreakdownTable from "../../components/PhaseBreakdownTable/PhaseBreakdownTable";
import SessionsList from "../../components/SessionsList/SessionsList";

const OverviewPage = ({ sessions }) => {
    return (
        <main className="overview-page">
        <h1 className="overview-page__title">Overview</h1>
        <OverviewStats sessions={sessions} />
        <PhaseBreakdownTable />
        <SessionsList sessions={sessions} />
        </main>
    );
};

export default OverviewPage;