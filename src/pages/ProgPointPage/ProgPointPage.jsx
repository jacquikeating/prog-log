import { useOutletContext } from "react-router-dom";
import PullsTable from "../../components/PullsTable/PullsTable";
import "./ProgPointPage.scss";

const ProgPointPage = () => {
    const { sessions, pulls } = useOutletContext();

    return (
        <main className="prog-point">
            <h1 className="prog-point__heading">
                Prog Point: 
                <span className="prog-point__mech">{sessions[0].prog_mech}</span>
            </h1>
            <PullsTable
                pullsArray={pulls.filter((pull) => pull.mech == sessions[0].prog_mech)}
                showEdit={false}
                progPhase={sessions[0].prog_phase}
                allowDelete={false}
            />
        </main>
    );
};

export default ProgPointPage;