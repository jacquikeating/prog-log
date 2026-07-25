import { useOutletContext } from "react-router-dom";
import PullsTable from "../../components/PullsTable/PullsTable";
import "./ProgPointPage.scss";

const ProgPointPage = () => {
    const { sessions, pulls } = useOutletContext();
    const latestSession = sessions[0];
    const progMech = latestSession.prog_mech;
    const progPhase = latestSession.prog_phase;
    const progPulls = pulls.filter((pull) => pull.mech == progMech);
    const firstSession = sessions.find((session) => session.num == progPulls[0].session_num);
    const bestPull = pulls.find((pull) => pull.id == 675); // temporarily hardcoded

    return (
        <main className="prog-point">
            <h1 className="prog-point__heading">
                Prog Point: 
                <span className="prog-point__mech">{progMech}</span>
            </h1>
            <section>
                <p>Phase {progPhase}</p>
                <p>{progPulls.length} pulls to date</p>
                <p>First seen in session {firstSession.num} (pull #{progPulls[0].pull_num_overall}), on {firstSession.date}</p>
                <p>Progging for {latestSession.num - firstSession.num} sessions</p>
            </section>
            <section>
                <p>Best pull:</p>
                <PullsTable
                    pullsArray={[bestPull]}
                    showEdit={false}
                    progPhase={progPhase}
                    allowDelete={false}
                />
            </section>
            <section>
                <p>All {progMech} pulls:</p>
                <PullsTable
                    pullsArray={progPulls}
                    showEdit={false}
                    progPhase={progPhase}
                    allowDelete={false}
                />
            </section>
        </main>
    );
};

export default ProgPointPage;