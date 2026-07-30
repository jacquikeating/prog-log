import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from 'react-router-dom';
import { supabase } from "../../supabase-client";
import { addPulls, updateExistingSessionPulls } from "../../utils/crud-functions.js";
import { createReadableDate } from "../../utils/shared-functions.js";
import NewSessionForm from "../../components/NewSessionForm/NewSessionForm";
import NewPullForm from "../../components/NewPullForm/NewPullForm";
import PullsTable from "../../components/PullsTable/PullsTable";
import "./AddDataPage.scss";

const AddDataPage = () => {
    const { sessions, pulls: prevPulls, user } = useOutletContext();
    const [sessionInProgress, setSessionInProgress] = useState(false);
    const [sessionData, setSessionData] = useState({});
    const [lastSession, setLastSession] = useState(null);
    const lsPullsArray = JSON.parse(localStorage.getItem("pullsFromNewSession"));
    const [pullsArray, setPullsArray] = useState(lsPullsArray || []);
    const [isNew, setIsNew] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // ON RENDER: Check local storage for data from an unfinished session.
        const lsSessionData = JSON.parse(localStorage.getItem("sessionInProgress"));
        // IF YES: Restore user's current progress. Render session info, NewPullForm, PullsTable, and submit button.
        // IF NO: Render NewSessionForm. Autofill with data from most recent session, or placeholder values.
        if (lsSessionData) {
            // Check whether any pulls from this session are in the database.
            const pullsInDB = prevPulls.find((pull) => pull.session_num == lsSessionData.num);
            // If yes, this is a pre-existing session and some functions will be modified.
            if (pullsInDB) {
                setIsNew(false);
            };
            setSessionData(lsSessionData);
            setSessionInProgress(true); 
        } else { 
            const prevSessions = sessions;
            if (prevSessions.length > 0) {
                setLastSession(prevSessions[0]);
            } else {
                const placeholder = {
                    static: "",
                    ulti: "",
                    num: 0,
                    date: "",
                    roster: "",
                    prog_phase: 1,
                    prog_mech: "Opener",
                    fflogs_link: "",
                    twitch_links: "",
                    analyzer_link: "",
                    yt_link: "",
                    img_link: "",
                    goal: "",
                    notes: ""
                };
                setLastSession(placeholder);
            };
        };
    }, []);

    function handleSessionFormData(data) {
        setSessionData(data);
        setSessionInProgress(true);
    };

    function handlePullFormData(newPull) {
        let insertAt = newPull.indexToInsert;
        delete newPull.indexToInsert;
        delete newPull.index;
        let copyOfPullsArray = [...pullsArray];
        if (insertAt == 0) {
            copyOfPullsArray.push(newPull);
        } else {
            copyOfPullsArray.splice(insertAt - 1, 0, newPull);
        };
        setPullsArray(copyOfPullsArray);
        localStorage.setItem("pullsFromNewSession", JSON.stringify(copyOfPullsArray));
    };

    function updatePull(pullData) {
        let copyOfPullsArray = [...pullsArray];
        copyOfPullsArray[pullData.index] = pullData;
        localStorage.setItem("pullsFromNewSession", JSON.stringify(copyOfPullsArray));
        setPullsArray(copyOfPullsArray);
    };

    function deletePull(pullData) {
        let copyOfPullsArray = [...pullsArray];
        copyOfPullsArray.splice(pullData.index, 1);
        localStorage.setItem("pullsFromNewSession", JSON.stringify(copyOfPullsArray));
        setPullsArray(copyOfPullsArray);
    };

    function handleSubmit() {
        if (isNew) {
            addPulls(prevPulls, sessionData, [...pullsArray]);
        } else {
            updateExistingSessionPulls(prevPulls, sessionData, [...pullsArray]);
        }
        navigate(`/report/${sessionData.num}`);
    };      

    function cancelNewSession(deleteSessionData) {
        localStorage.removeItem("pullsFromNewSession");
        localStorage.removeItem("sessionInProgress");

        async function deleteSession() {
            const { error } = await supabase.from("sessions").delete().eq("id", sessionData.id);
            if (error) {
                console.error("Error deleting session: ", error.message);
                return;
            };
        };

        if (deleteSessionData) {
            deleteSession();
        };

        navigate("/");
    };

    if (user?.permissions != "admin") {
        return (
            <main className="add-data">
                <h1 className="add-data__heading">Add Data</h1>
                <p>ERROR: You must have admin privileges to view this page.</p>
            </main>
        );
    };

    return (
        <main className="add-data">
            <h1 className="add-data__heading">Add Data</h1>
            {!sessionInProgress ? (
                <section className="add-data__section">
                    <h2 className="add-data__section-heading">New Session</h2>
                    {lastSession && 
                        <NewSessionForm
                            lastSession={lastSession}
                            handleSessionFormData={handleSessionFormData}
                            setSessionData={setSessionData}
                        />
                    }
                </section>
            ) : (
                <>
                    <section className="add-data__section">
                        <h2 className="add-data__section-heading">Session Info</h2>
                        {/* <p>Static: {sessionData.static}</p>
                        <p>Ulti: {sessionData.ulti}</p> */}
                        <p>Session #: {sessionData.num}</p>
                        <p>Date: {createReadableDate(sessionData.date)}</p>
                        <p>Roster: {sessionData.roster}</p>
                        <p>Prog Point: Phase {sessionData.prog_phase},{" "}{sessionData.prog_mech}</p>
                        <p>Goal: {sessionData.goal}</p>
                        <p>Notes: {sessionData.notes}</p>
                        <p>FFLogs Link: {sessionData.fflogs_link}</p>
                        <p>Stream Links: {sessionData.twitch_links}</p>
                    </section>
                    <section className="add-data__section">
                        <h2 className="add-data__section-heading">Add a Pull</h2>
                        <NewPullForm
                            sessionData={sessionData}
                            pullsArray={pullsArray}
                            handlePullFormData={handlePullFormData}
                        />
                    </section>
                    <section className="add-data__section">
                        <h2 className="add-data__section-heading">Pulls</h2>
                        <PullsTable
                            pullsArray={pullsArray}
                            showEdit={true}
                            deletePull={deletePull}
                            updatePull={updatePull}
                            progPhase={sessionData.prog_phase}
                            allowDelete={true}
                        />
                    </section>
                    <section className="add-data__section">
                        <button className="add-data__button" onClick={handleSubmit}>
                            Complete Session
                        </button>
                        <div className="add-data__delete-btns-container">
                            <button className="add-data__button" onClick={() => cancelNewSession(false)}>
                                Cancel
                            </button>
                            <button className="add-data__button" onClick={() => cancelNewSession(true)}>
                                Cancel & Delete
                            </button>
                        </div>
                        
                    </section>
                </>
            )}
        </main>
    );
};

export default AddDataPage;