import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { supabase } from "../../supabase-client";
import { createReadableDate } from "../../utils/shared-functions.js";
import NewSessionForm from "../../components/NewSessionForm/NewSessionForm";
import NewPullForm from "../../components/NewPullForm/NewPullForm";
import PullsTable from "../../components/PullsTable/PullsTable";
import "./AddDataPage.scss";

const AddDataPage = ({ sessions }) => {
    const [sessionInProgress, setSessionInProgress] = useState(false);
    const [sessionData, setSessionData] = useState({});
    const [lastSession, setLastSession] = useState(null);
    const lsPullsArray = JSON.parse(localStorage.getItem("pullsFromNewSession"));
    const [pullsArray, setPullsArray] = useState(lsPullsArray || []);
    const navigate = useNavigate();

    useEffect(() => {
        // ON RENDER: Check local storage for data from an unfinished session.
        const lsSessionData = JSON.parse(localStorage.getItem("sessionInProgress"));
        // IF YES: Restore user's current progress. Render session info, NewPullForm, PullsTable, and submit button.
        // IF NO: Render NewSessionForm. Autofill with data from most recent session, or placeholder values.
        if (lsSessionData) {
            setSessionData(lsSessionData);
            setSessionInProgress(true); 
        } else { 
            const prevSessions = sessions;
            if (prevSessions.length > 0) {
                setLastSession(prevSessions[0]);
            } else {
                const placeholder = {
                    id: 0,
                    static: "",
                    ulti: "",
                    num: 0,
                    date: "",
                    roster: "",
                    prog_phase: 1,
                    prog_mech: "Opener",
                    fflogs_link: "",
                    twitch_links: "",
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
    }

    function handlePullFormData(newPull) {
        let insertAt = newPull.indexToInsert;
        delete newPull.indexToInsert;
        let copyOfPullsArray = [...pullsArray];
        if (insertAt == 0) {
            copyOfPullsArray.push(newPull);
        } else {
            copyOfPullsArray.splice(insertAt - 1, 0, newPull);
        };
        setPullsArray(copyOfPullsArray);
        localStorage.setItem("pullsFromNewSession", JSON.stringify(copyOfPullsArray));
    }

    function updatePull(pullData) {
        let copyOfPullsArray = [...pullsArray];
        copyOfPullsArray[pullData.index] = pullData;
        localStorage.setItem("pullsFromNewSession", JSON.stringify(copyOfPullsArray));
        setPullsArray(copyOfPullsArray);
    }

    function deletePull(pullData) {
        let copyOfPullsArray = [...pullsArray];
        copyOfPullsArray.splice(pullData.index, 1);
        localStorage.setItem("pullsFromNewSession", JSON.stringify(copyOfPullsArray));
        setPullsArray(copyOfPullsArray);
    }

    function handleSubmit() {
        let existingPullsCount = Number(localStorage.getItem("existingPullsCount")) || 0;

        function preparePullsForBackend() {
            const copyArray = [...pullsArray];
            const numberedPulls = copyArray.map((pull, index) => (
                {
                    ...pull,
                    pull_num_today: Number(index + 1),
                    pull_num_overall: Number(index + 1) + existingPullsCount,
                }));
                return numberedPulls;
            };

        const preparedPulls = preparePullsForBackend();
       
        async function insertPulls(){
            const {error} = await supabase.from("pulls").insert(preparedPulls);
            if (error) { 
                console.error("Error adding pulls: ", error);
            };
        };

        insertPulls();
        const lastPullNumOverall = pullsArray[pullsArray.length - 1].pull_num_overall;
        localStorage.setItem("existingPullsCount", lastPullNumOverall);
        navigator.clipboard.writeText(localStorage.getItem("pullsFromNewSession"));
        localStorage.removeItem("pullsFromNewSession");
        localStorage.removeItem("sessionInProgress");
        navigate(`/report/${sessionData.num}`);
    }

    function cancelNewSession() {
        localStorage.removeItem("pullsFromNewSession");
        localStorage.removeItem("sessionInProgress");

        async function deleteSession() {
            const { error } = await supabase.from("sessions").delete().match({ 
                num: sessionData.num, 
                static: sessionData.static, 
                ulti: sessionData.ulti 
            });

            if (error) {
                console.error("Error deleting session: ", error.message);
                return;
            };
        };

        deleteSession();
        navigate("/");
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
                        />
                    }
                </section>
            ) : (
                <>
                    <section className="add-data__section">
                        <h2 className="add-data__section-heading">Session Info</h2>
                        <p>Static: {sessionData.static}</p>
                        <p>Ulti: {sessionData.ulti}</p>
                        <p>Session: {sessionData.num}</p>
                        <p>Date: {createReadableDate(sessionData.date)}</p>
                        <p>Roster: {sessionData.roster}</p>
                        <p>Prog Point: Phase {sessionData.prog_phase},{" "}{sessionData.prog_mech}</p>
                        <p>Goal: {sessionData.goal}</p>
                        <p>Notes: {sessionData.notes}</p>
                        <p>FFLogs Link: {sessionData.fflogs_link}</p>
                        <p>Twitch Links: {sessionData.twitch_links}</p>
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
                        <button className="add-data__button" onClick={cancelNewSession}>
                            Cancel
                        </button>
                    </section>
                </>
            )}
        </main>
    );
};

export default AddDataPage;