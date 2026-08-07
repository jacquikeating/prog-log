import { useState, useEffect, createContext } from "react";
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import { supabase } from "../../supabase-client";
import { diff } from 'deep-object-diff';
import PullsSection from "../../components/PullsSection/PullsSection.jsx";
import SessionInfo from "../../components/SessionInfo/SessionInfo.jsx";
import SessionInfoEdit from "../../components/SessionInfo/SessionInfoEdit.jsx";
import "./ReportPage.scss";

const SessionContext = createContext();
const PullsContext = createContext();
const EditContext = createContext();

const ReportPage = () => {
    const { sessions, pulls, user } = useOutletContext();
    const { sessionNum } = useParams();
    const [originalSession, setOriginalSession] = useState(sessions.find((session) => session.num == sessionNum));
    const [session, setSession] = useState(originalSession);
    const [pullsArray, setPullsArray] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [allowDelete, setAllowDelete] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 1040;
    let pullToUpdate = {};
    const navigate = useNavigate();
    let showPulls = true; // Temporarily hardcoded

    useEffect(() => {
        const thisSession = sessions.find((session) => session.num == sessionNum);
        setSession(thisSession);
        setOriginalSession(thisSession);
        setPullsArray(pulls.filter((pull) => pull.session_num == sessionNum));
        if (user?.member_of == thisSession.static) {
            if (user?.permissions == "admin") {
                setShowEdit(true);
                setAllowDelete(true);
            } else if (user?.permissions == "member") {
                setShowEdit(true);
            };
        };
    }, [sessionNum]);

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize"), handleWindowResize;
    }, []);

    async function updatePull(editedPull) {
        const originalPull = pulls.find((pull) => pull.id == editedPull.id);
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
        const deletedPullNum = pullToDelete.pull_num_overall;

        const { error } = await supabase.from("pulls").delete().eq("id", pullToDelete.id);
        if (error) {
            console.error("Error deleting pull: ", error.message);
            return;
        } else {
            const pullsCopy = structuredClone(pulls);
            const filteredPulls = pullsCopy.filter((pull) => pull.pull_num_overall > deletedPullNum);
            filteredPulls.forEach((pull, index) => {
                pull.pull_num_overall = Number(index) + deletedPullNum;
                if (pull.session_num == pullToDelete.session_num){
                    pull.pull_num_today--
                };
                updatePull(pull);
            });
            setPullsArray(filteredPulls.filter((pull) => pull.session_num == sessionNum));
        };
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

    function gotoAddDataPage() {
        localStorage.setItem("sessionInProgress", JSON.stringify(session));
        localStorage.setItem("pullsFromNewSession", JSON.stringify(pullsArray));
        navigate("/add");
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
                    {
                        // type of report // progpointpage is just a variant of reportpage
                        // component?
                        // what if for each mechanic
                        // like pl.com/mech-name
                    }
                    {session ? (
                        <>
                            {!editMode ? <SessionInfo /> : <SessionInfoEdit />}
                            {!showPulls || pullsArray.length == 0 ? (
                                <p>No pulls found for this session. Please try again later.</p>
                            ) : (
                                <PullsContext.Provider value={{ pullsCtx }}>
                                    <PullsSection />
                                </PullsContext.Provider>
                            )}
                            {user?.permissions == "admin" && <button onClick={gotoAddDataPage}>Add pulls</button>}
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