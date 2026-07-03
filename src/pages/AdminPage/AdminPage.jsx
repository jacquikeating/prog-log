import { useOutletContext } from "react-router-dom";
import DataRescuer from "../../components/DataRescuer/DataRescuer";

const AdminPage = () => {
    const { sessions, pulls: prevPulls } = useOutletContext();

    return (
        <main className="admin-page">
            <h1 className="admin-page__heading">Admin Dashboard</h1>
            <DataRescuer sessions={sessions} prevPulls={prevPulls} />
        </main>
    );
};

export default AdminPage;