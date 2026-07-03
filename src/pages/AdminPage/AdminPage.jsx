import { useOutletContext } from "react-router-dom";
import DataRescuer from "../../components/DataRescuer/DataRescuer";

const AdminPage = () => {
    const { sessions, pulls: prevPulls, user } = useOutletContext();

    if (user?.permissions != "admin") {
        return (
            <main className="admin-page">
                <h1 className="admin-page__heading">Admin Dashboard</h1>
                <p>ERROR: You must have admin privileges to view this page.</p>
            </main>
        );
    };

    return (
        <main className="admin-page">
            <h1 className="admin-page__heading">Admin Dashboard</h1>
            <DataRescuer sessions={sessions} prevPulls={prevPulls} />
        </main>
    );
};

export default AdminPage;