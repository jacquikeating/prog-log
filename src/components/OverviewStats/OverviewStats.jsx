const OverviewStats = ({ sessions }) => {
    return (
        <div className="overview-page__stats">
        <p className="overview-page__info">Total sessions: {sessions.length}</p>
        <p className="overview-page__info">Total pulls: 0</p>
        <p className="overview-page__info">Current prog point: {sessions[0].prog_phase}, {sessions[0].prog_mech}</p>
        <p className="overview-page__info">Pulls at prog point: 0</p>
        </div>
    );
};

export default OverviewStats;