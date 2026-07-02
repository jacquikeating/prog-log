import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout = ({ sessions, pulls, user, setUser }) => {

    return (
        <>
            <Header latestSession={sessions.length} user={user} />
            <Outlet context={{sessions, pulls, user, setUser}} />
        </>
    )

};

export default Layout;