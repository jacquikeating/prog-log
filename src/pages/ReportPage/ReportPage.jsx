import { useParams } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect, createContext } from "react";
// import useGetPulls from "../../hooks/use-get-pulls.js";
// import axios from "axios";
import PullsSection from "../../components/PullsSection/PullsSection.jsx";
import SessionInfo from "../../components/SessionInfo/SessionInfo.jsx";
import SessionInfoEdit from "../../components/SessionInfo/SessionInfoEdit.jsx";
import "./ReportPage.scss";

// const API_URL = import.meta.env.VITE_API_URL;
const SessionContext = createContext();
const PullsContext = createContext();
const EditContext = createContext();

const ReportPage = ({ sessions, pulls }) => {
    const { sessionID } = useParams();
    const [session, setSession] = useState(
        sessions.find((session) => session.id == sessionID)
    );
    const [pullsArray, setPullsArray] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [showEdit, setShowEdit] = useState(true);
    const [allowDelete, setAllowDelete] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 1040;
    // const { isAuthenticated, user } = useAuth0();
    let role = "none";
    let pullToUpdate = {};

    // const { pulls, isPending } = useGetPulls(sessionID);
    const isPending = false; // Temporarily hardcoded

    useEffect(() => {
        if (!isPending) {
            console.log(pulls.filter((pull) => pull.session_id == sessionID))
            setPullsArray(pulls.filter((pull) => pull.session_id == sessionID));
        }
    }, [isPending]);

    useEffect(() => {
        // if (isAuthenticated) {
        //     role = user["https://wall-is-safe.netlify.app/roles"][0];
        // }
        // if (role === "admin") {
        //     setShowEdit(true);
        //     setAllowDelete(true);
        // } else if (role === "static") {
        //     setShowEdit(true);
        // }

        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize"), handleWindowResize;
    }, [sessionID]);

    // async function updatePull(pull) {
    //     delete pull.index;
    //     pullToUpdate = { ...pull };
    //     console.log(pull);
    //     try {
    //         await axios.put(`${API_URL}/pulls/${pullToUpdate.id}`, pullToUpdate);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // async function deletePull(pullToDelete) {
    //     try {
    //     const response = await axios.delete(
    //         `${API_URL}/pulls/${pullToDelete.id}`
    //     );
    //     if (response.status === 204) {
    //         setPullsArray(pullsArray.filter((pull) => pull.id !== pullToDelete.id));
    //     }
    //     } catch (err) {
    //         console.error("Error deleting pull:", err);
    //     }
    // }

    async function editSession() {
        if (editMode === false) {
            setEditMode(true);
        } else if (editMode === true) {
            const updatedSessionObj = { ...session };
            console.log("This is where I'd put my edited session info. IF I HAD ONE");
            // try {
            //     await axios.put(`${API_URL}/sessions/${sessionID}`, updatedSessionObj);
            // } catch (error) {
            //     console.error(error);
            // }
            setEditMode(false);
        }
    }

    const sessionCtx = {
        session,
        pullsArray,
        sessionID,
    };

    const pullsCtx = {
        pulls,
        width,
        breakpoint,
        isPending,
    };

    const editCtx = {
        editMode,
        setEditMode,
        showEdit,
        allowDelete,
        // updatePull,
        // deletePull,
        // pullToUpdate,
        setPullsArray,
        setSession,
        editSession,
    };

    return (
        <SessionContext.Provider value={{ sessionCtx }}>
            <EditContext.Provider value={{ editCtx }}>
                <main className="report">
                    {session.id ? (
                        <>
                            {!editMode ? <SessionInfo /> : <SessionInfoEdit />}
                            <PullsContext.Provider value={{ pullsCtx }}>
                                <PullsSection />
                            </PullsContext.Provider>
                        </>
                    ) : (
                        <p>Could not retrieve data for session #{sessionID}</p>
                    )}
                </main>
            </EditContext.Provider>
        </SessionContext.Provider>
    );
};

export default ReportPage;
export { SessionContext, EditContext, PullsContext };