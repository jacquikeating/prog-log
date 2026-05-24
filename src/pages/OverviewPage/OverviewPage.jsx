import OverviewStats from "../../components/OverviewStats/OverviewStats.jsx";
import PhaseBreakdownTable from "../../components/PhaseBreakdownTable/PhaseBreakdownTable";

const OverviewPage = () => {
    return (
        <main className="overview-page">
        <h1 className="overview-page__title">Overview</h1>
        <OverviewStats />
        <PhaseBreakdownTable />
        </main>
    );
};

export default OverviewPage;