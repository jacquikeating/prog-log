import { useOutletContext } from "react-router-dom";
import "./ProgPointPage.scss";

const ProgPointPage = () => {
    const { sessions, pulls } = useOutletContext();

    return (
        <main className="prog-point">
            <h1 className="prog-point__heading">Prog Point: {sessions[0].prog_mech}</h1>
        </main>
    );
};

export default ProgPointPage;