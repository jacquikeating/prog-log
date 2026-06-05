import { getPullsAtProgPoint, getClearsNum } from "../../utils/shared-functions.js";

const OverviewStats = ({ sessions, pulls }) => {
    return (
        <div className="overview-page__stats">
            <p className="overview-page__info">Total sessions: {sessions.length}</p>
            <p className="overview-page__info">Total pulls: {pulls.length}</p>
            {sessions[0].prog_mech === "Reclears" ? (
                <p className="overview-page__info">
                Total clears: {getClearsNum(pulls)}
                </p>
            ) : (
                <>
                    <p className="overview-page__info">
                        {`Current prog point:
                            Phase ${sessions[0]?.prog_phase}, 
                            ${sessions[0]?.prog_mech}`}
                    </p>
                    <p className="overview-page__info">
                        Pulls at prog point: {getPullsAtProgPoint(pulls, sessions[0])}
                    </p>
                </>
            )};
        </div>
    );
};

export default OverviewStats;