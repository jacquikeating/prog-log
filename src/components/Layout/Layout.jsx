import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout = ({ globalStates }) => {
    const {sessions, setSessions, pulls, setPulls, user, setUser} = globalStates;

    return (
        <>
            <Header latestSession={sessions.length} user={user} />
            <Outlet context={{sessions, setSessions, pulls, setPulls, user, setUser}} />
        </>
    )

};

export default Layout;