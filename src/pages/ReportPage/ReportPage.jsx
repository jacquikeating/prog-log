import { useState, useEffect, createContext } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabase-client";
import { diff } from 'deep-object-diff';
// import { useAuth0 } from "@auth0/auth0-react";
import PullsSection from "../../components/PullsSection/PullsSection.jsx";
import SessionInfo from "../../components/SessionInfo/SessionInfo.jsx";
import SessionInfoEdit from "../../components/SessionInfo/SessionInfoEdit.jsx";
import "./ReportPage.scss";

const SessionContext = createContext();
const PullsContext = createContext();
const EditContext = createContext();

const ReportPage = ({ sessions, pulls }) => {
    const { sessionNum } = useParams();
    const originalSession = sessions.find((session) => session.num == sessionNum);
    const [session, setSession] = useState(originalSession);
    const [pullsArray, setPullsArray] = useState(pulls);
    const [editMode, setEditMode] = useState(false);
    const [showEdit, setShowEdit] = useState(true);
    const [allowDelete, setAllowDelete] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 1040;
    // const { isAuthenticated, user } = useAuth0();
    let role = "none";
    let pullToUpdate = {};

    useEffect(() => {
        setPullsArray(pulls.filter((pull) => pull.session_num == sessionNum));
    }, []);

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
    }, [sessionNum]);

    async function updatePull(editedPull) {
        const originalPull = pullsArray[editedPull.index];
        delete editedPull.index;
        const editedProperties = diff(originalPull, editedPull); // diff function returns an object with only the properties that don't match
        const { error } = await supabase.from("pulls")
            .update(editedProperties) 
            .eq("id", originalPull.id);
        if (error) {
            console.error("Error updating pull: ", error.message);
            return;
        };
    }

    async function deletePull(pullToDelete) {
        const { error } = await supabase.from("pulls").delete().eq("id", pullToDelete.id);
        if (error) {
            console.error("Error deleting pull: ", error.message);
            return;
        };
        // TO DO: Add functions to remove from state (unrender from UI) and update other pulls' pull nums
    }

    function editSession() {
        if (editMode == false) {
            setEditMode(true);
        } else if (editMode == true) {
            const updatedSessionObj = { ...session };
                        
            async function updateSession() {
                const { error } = await supabase.from("sessions")
                    .update(diff(originalSession, updatedSessionObj)) // diff function returns an object with only the properties that don't match
                    .eq("id", session.id);
                if (error) {
                    console.error("Error updating session: ", error.message);
                    return;
                };
            };

            updateSession();
            setEditMode(false);
        };
    };

    const sessionCtx = {
        session,
        pullsArray,
        sessionNum,
    };

    const pullsCtx = {
        pulls,
        width,
        breakpoint,
    };

    const editCtx = {
        editMode,
        setEditMode,
        showEdit,
        allowDelete,
        updatePull,
        deletePull,
        pullToUpdate,
        setPullsArray,
        setSession,
        editSession,
    };

    return (
        <SessionContext.Provider value={{ sessionCtx }}>
            <EditContext.Provider value={{ editCtx }}>
                <main className="report">
                    {session ? (
                        <>
                            {!editMode ? <SessionInfo /> : <SessionInfoEdit />}
                            <PullsContext.Provider value={{ pullsCtx }}>
                                <PullsSection />
                            </PullsContext.Provider>
                        </>
                    ) : (
                        <p>Could not retrieve data for session #{sessionNum}</p>
                    )}
                </main>
            </EditContext.Provider>
        </SessionContext.Provider>
    );
};

export default ReportPage;
export { SessionContext, EditContext, PullsContext };