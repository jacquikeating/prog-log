import { useState, useContext } from "react";
import { SessionContext, EditContext } from "../../pages/ReportPage/ReportPage.jsx";
import { createReadableDate, checkIfEmptyLink } from "../../utils/shared-functions.js";
import SessionStats from "./SessionStats.jsx";
import PhaseBreakdownTable from "../PhaseBreakdownTable/PhaseBreakdownTable";
import "./SessionInfo.scss";

const SessionInfo = () => {
  const { sessionCtx } = useContext(SessionContext);
  const { session, pullsArray, sessionNum } = sessionCtx;
  const { editCtx } = useContext(EditContext);
  const { editSession, setSession, showEdit } = editCtx;
  const [twitchLinksArray, setTwitchLinksArray] = useState(session.twitch_links.split(", "));

  return (
    <section className="report__section">
      <h1 className="report__heading">
        Report:
        <span className="report__date">{createReadableDate(session.date)}</span>
      </h1>

      <p className="report__subtitle">
        Session {session.num}
        <span className="report__divider"> • </span>
        {session.prog_mech === "Reclears" && sessionNum !== "37"
          ? "Reclears"
          : `Phase ${session.prog_phase} ${session.prog_mech} Prog`}
        <span className="report__divider"> • </span>
        <a
          className={`report__link ${checkIfEmptyLink(session.fflogs_link)}`}
          href={session.fflogs_link}
          target="_blank"
          rel="noreferrer"
        >
          <img src="/25_fflogs.png" className="report__icon" />
          Logs
        </a>
        <>
          {twitchLinksArray.length > 1 ? (
            twitchLinksArray.map((vod, index) => {
              const isYTLink = vod[12] == "y" // Checks first character after 'https://www.' in the URL

              return (
                <>
                  <span className="report__divider"> • </span>
                  <a
                    className={`session__link`}
                    href={vod}
                    target="_blank"
                    rel="noreferrer"
                    key={index}
                  >
                    <img
                      src={isYTLink ? "/yt_icon.jpg" : "/25_twitch.png"}
                      className="session__icon"
                      key={index}
                    />
                    VOD {index + 1}
                  </a>
                </>
              );
            })
          ) : (
            <>
              <span className="report__divider"> • </span>
              <a
                className={`session__link ${checkIfEmptyLink(session.twitch_links)}`}
                href={session.twitch_links}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={session.twitch_links[12] == "y" ? "/yt_icon.jpg" : "/25_twitch.png"} // Checks first character after 'https://www.' in the URL
                  className="session__icon"
                />
                VOD
              </a>
            </>
          )}
        </>
        {showEdit ? (
          <button className="report__button" onClick={editSession}>
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
        ) : (
          ""
        )}
      </p>

      <div className="report__extra-info-container">
        <div className="report__extra-info-left">
          {session.goal.length > 0 ? (
              <p className="report__extra-info">
                <span className="report__extra-info--bold">Goal: </span>
                {session.goal}
              </p>
            ) : 
            ("")
          }
          
          <p className="report__extra-info">
            <span className="report__extra-info--bold">Roster: </span>
            {session.roster}
          </p>
          <SessionStats />
        </div>

        <PhaseBreakdownTable
          progPhase={session.prog_phase}
          pulls={pullsArray}
        />

        <div className="report__extra-info-right">
          {session.notes.length > 0 ? (
            <div className="report__extra-info">
              <span className="report__extra-info--bold">Notes: </span>
              <ul className="report__list">
                {session.notes.split(", ").map((note) => {
                  return (
                    <li className="report__note" key={note}>
                      {note}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};

export default SessionInfo;