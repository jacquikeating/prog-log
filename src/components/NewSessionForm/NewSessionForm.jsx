import { useState } from "react";
import { supabase } from "../../supabase-client";
import "./NewSessionForm.scss";

const NewSessionForm = ({ lastSession, handleSessionFormData }) => {
    const [staticName, setStaticName] = useState(lastSession.static);
    const [ulti, setUlti] = useState(lastSession.ulti);
    const [num, setNum] = useState(lastSession.num + 1);
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [roster, setRoster] = useState(lastSession.roster);
    const [progPhase, setProgPhase] = useState(lastSession.prog_phase);
    const [progMech, setProgMech] = useState(lastSession.prog_mech);
    const [ffLogsLink, setFFLogsLink] = useState("");
    const [twitchLinks, setTwitchLinks] = useState("");
    const [goal, setGoal] = useState("");
    const [notes, setNotes] = useState("");

    async function handleSubmit() {
        const sessionObj = {
            static: staticName,
            ulti: ulti,
            num: Number(num),
            date: date,
            prog_phase: Number(progPhase),
            prog_mech: progMech,
            fflogs_link: ffLogsLink,
            twitch_links: twitchLinks,
            roster: roster,
            goal: goal,
            notes: notes,
        };

        handleSessionFormData(sessionObj);
        localStorage.setItem("sessionInProgress", JSON.stringify(sessionObj));
        const {error} = await supabase.from("sessions").insert(sessionObj).single();
        if (error) { 
            console.error("Error adding session: ", error.message);
        }
    }

    return (
        <div className="session-form">
            <div className="session-form__container">
                <div className="session-form__labels-column">
                    <label className="session-form__label" htmlFor="static">
                        Static
                    </label>
                    <label className="session-form__label" htmlFor="ulti">
                        Ulti
                    </label>
                    <label className="session-form__label" htmlFor="session-num">
                        Session #
                    </label>
                    <label className="session-form__label" htmlFor="session-num">
                        Date
                    </label>
                    <label className="session-form__label" htmlFor="roster">
                        Roster
                    </label>
                    <label className="session-form__label" htmlFor="prog-phase">
                        Prog Phase
                    </label>
                    <label className="session-form__label" htmlFor="prog-mech">
                        Prog Mech
                    </label>
                    <label className="session-form__label" htmlFor="fflogs-link">
                        FFLogs Link
                    </label>
                    <label className="session-form__label" htmlFor="twitch-links">
                        Twitch Links
                    </label>
                    <label className="session-form__label" htmlFor="goal">
                        Goal
                    </label>
                    <label className="session-form__label" htmlFor="notes">
                        Notes
                    </label>
                </div>

                <div className="session-form__inputs-column">
                    <input
                        className="session-form__input session-form__input--number"
                        type="text"
                        name="static"
                        id="static"
                        value={staticName}
                        onChange={(e) => setStaticName(e.target.value)}
                    />
                    <input
                        className="session-form__input session-form__input--number"
                        type="text"
                        name="ulti"
                        id="ulti"
                        value={ulti}
                        onChange={(e) => setUlti(e.target.value)}
                    />
                    <input
                        className="session-form__input session-form__input--number"
                        type="number"
                        name="session-num"
                        id="session-num"
                        value={num}
                        onChange={(e) => setNum(e.target.value)}
                    />
                    <input
                        className="session-form__input session-form__input--number"
                        type="text"
                        name="date"
                        id="date"
                        placeholder="YYYY-MM-DD"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <input
                        className="session-form__input form__input--text"
                        type="text"
                        name="roster"
                        id="roster"
                        value={roster}
                        onChange={(e) => setRoster(e.target.value)}
                    />
                    <input
                        className="session-form__input form__input--number"
                        type="number"
                        name="prog-phase"
                        id="prog-phase"
                        value={progPhase}
                        onChange={(e) => setProgPhase(e.target.value)}
                    />
                    <input
                        className="session-form__input session-form__input--text"
                        type="text"
                        name="prog-mech"
                        id="prog-mech"
                        value={progMech}
                        onChange={(e) => setProgMech(e.target.value)}
                    />
                    <input
                        className="session-form__input session-form__input--text"
                        type="text"
                        name="fflogs-link"
                        id="fflogs-link"
                        value={ffLogsLink}
                        onChange={(e) => setFFLogsLink(e.target.value)}
                    />
                    <input
                        className="session-form__input session-form__input--text"
                        type="text"
                        name="twitch-links"
                        id="twitch-links"
                        value={twitchLinks}
                        onChange={(e) => setTwitchLinks(e.target.value)}
                    />
                    <input
                        className="session-form__input form__input--text"
                        type="text"
                        name="goal"
                        id="goal"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                    />
                    <input
                        className="session-form__input form__input--text"
                        type="text"
                        name="notes"
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
            </div>

            <button className="session-form__button" onClick={handleSubmit}>
                Start
            </button>
        </div>
    );
};

export default NewSessionForm;