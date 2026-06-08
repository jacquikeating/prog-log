import DataRescuer from "../../components/DataRescuer/DataRescuer";

const AdminPage = ({ sessions, prevPulls }) => {
    return (
        <main className="admin-page">
            <h1 className="admin-page__heading">Admin Dashboard</h1>
            <DataRescuer sessions={sessions} prevPulls={pulls} />
        </main>
    );
};

export default AdminPage;