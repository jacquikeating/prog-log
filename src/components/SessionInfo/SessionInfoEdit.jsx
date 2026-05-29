import { useContext } from "react";
import { SessionContext, EditContext } from "../../pages/ReportPage/ReportPage.jsx";
import PhaseBreakdownTable from "../PhaseBreakdownTable/PhaseBreakdownTable";
import SessionStats from "./SessionStats.jsx";

const SessionInfoEdit = () => {
    const { sessionCtx } = useContext(SessionContext);
    const { session, pullsArray } = sessionCtx;
    const { editCtx } = useContext(EditContext);
    const { editSession, setSession } = editCtx;

    return (
        <section className="report__section">
            <h1 className="report__heading">
                Report:
                <input
                    type="text"
                    id="date-input"
                    name="date-input"
                    placeholder="YYYY-MM-DD"
                    value={session.date}
                    onChange={(e) =>
                        setSession((prevSession) => {
                        return { ...prevSession, date: e.target.value };
                        })
                    }
                    className="report__input"
                />
            </h1>

            <p className="report__subtitle">
                Session {session.id}
                <span className="report__divider"> • </span>
                <>
                    <input
                        type="number"
                        value={session.prog_phase}
                        onChange={(e) =>
                            setSession((prevSession) => {
                                return { ...prevSession, prog_phase: e.target.value };
                            })
                        }
                        className="report__input"
                    />
                    <input
                        type="text"
                        value={session.prog_mech}
                        onChange={(e) =>
                            setSession((prevSession) => {
                                return { ...prevSession, prog_mech: e.target.value };
                            })
                        }
                        className="report__input"
                    />
                </>
                <span className="report__divider"> • </span>
                <input
                    type="text"
                    value={session.fflogs_link}
                    onChange={(e) =>
                        setSession((prevSession) => {
                        return { ...prevSession, fflogs_link: e.target.value };
                        })
                    }
                    className="report__input"
                />
                <>
                    <input
                        type="text"
                        value={session.twitch_links}
                        onChange={(e) => {
                            setSession((prevSession) => {
                                return { ...prevSession, twitch_links: e.target.value };
                            });
                        }}
                        className="report__input"
                    />
                </>
                <button className="report__button" onClick={editSession}>
                    <i className="fa-solid fa-check report__save"></i>
                </button>
            </p>

            <div className="report__extra-info-container">
                <div className="report__extra-info-left">
                    <p className="report__extra-info">
                        <span className="report__extra-info--bold">Goal: </span>
                        <input
                            type="text"
                            value={session.goal}
                            onChange={(e) =>
                                setSession((prevSession) => {
                                return { ...prevSession, goal: e.target.value };
                                })
                            }
                            className="report__input"
                        />
                    </p>
                    <p className="report__extra-info">
                        <span className="report__extra-info--bold">Roster: </span>
                        <input
                            type="text"
                            value={session.roster}
                            onChange={(e) =>
                                setSession((prevSession) => {
                                return { ...prevSession, roster: e.target.value };
                                })
                            }
                            className="report__input"
                        />
                    </p>
                    <SessionStats />
                </div>
                <PhaseBreakdownTable
                    progPhase={session.prog_phase}
                    pulls={pullsArray}
                />

                <div className="report__extra-info-right">
                    <div className="report__extra-info report__extra-info--notes">
                        <span className="report__extra-info--bold">Notes: </span>
                        <textarea
                            value={session.notes}
                            onChange={(e) =>
                                setSession((prevSession) => {
                                return { ...prevSession, notes: e.target.value };
                                })
                            }
                            className="report__input"
                        ></textarea>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SessionInfoEdit;