import { useOutletContext } from "react-router-dom";
import PullsTable from "../../components/PullsTable/PullsTable";
import "./ProgPointPage.scss";

const ProgPointPage = () => {
    const { sessions, pulls } = useOutletContext();
    const latestSession = sessions[0];
    const progMech = latestSession.prog_mech;
    const progPhase = latestSession.prog_phase;
    const progPulls = pulls.filter((pull) => pull.mech == progMech);
    const firstSession = sessions.find((session) => session.num == progPulls[0].session_num)

    return (
        <main className="prog-point">
            <h1 className="prog-point__heading">
                Prog Point: 
                <span className="prog-point__mech">{progMech}</span>
            </h1>
            <PullsTable
                pullsArray={progPulls}
                showEdit={false}
                progPhase={progPhase}
                allowDelete={false}
            />
=        </main>
    );
};

export default ProgPointPage;