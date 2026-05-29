import { useState } from "react";
import { checkIfProgPointReached } from "../../utils/shared-functions";
import PullLink from "../PullLink/PullLink";
import "./PullDiv.scss";

const PullDiv = ({
  pullData,
  showEdit,
  updatePull,
  deletePull,
  progPhase,
  allowDelete,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [phase, setPhase] = useState(pullData.phase);
  const [mech, setMech] = useState(pullData.mech);
  const [cause, setCause] = useState(pullData.cause);
  const [playersResponsible, setPlayersResponsible] = useState(
    pullData.players_responsible
  );
  const [logLink, setLogLink] = useState(pullData.log_link);
  const [clipLink, setClipLink] = useState(pullData.clip_link);
  const [notes, setNotes] = useState(pullData.notes);
  const index = pullData.index;

  function editPull() {
    if (editMode === false) {
      setEditMode(true);
    } else if (editMode === true) {
      setEditMode(false);
      updatePull({
        id: pullData.id,
        session_id: pullData.session_id,
        phase: phase,
        mech: mech,
        prog_point_reached: checkIfProgPointReached(progPhase, phase),
        cause: cause,
        players_responsible: playersResponsible,
        log_link: logLink,
        clip_link: clipLink,
        notes: notes,
        index: index,
      });
    }
  }

  return (
    <div className="pull-div">
      <p className="pull-div__pull-num">{pullData.pull_num_today}</p>
      <div className="pull-div__info">
        <div className="pull-div__top">
          <p className="pull-div__p pull-div__p--mech">
            P
            {!editMode ? (
              phase
            ) : (
              <input
                className="pull-div__input pull-div__input--number"
                type="number"
                value={phase}
                onChange={(e) => {
                  setPhase(e.target.value);
                }}
              />
            )}
            <span className="pull-div__divider">•</span>
            {!editMode ? (
              mech
            ) : (
              <input
                className="pull-div__input pull-div__input--mech"
                placeholder="Mech..."
                type="text"
                value={mech}
                onChange={(e) => {
                  setMech(e.target.value);
                }}
              />
            )}
          </p>
        </div>

        <div className="pull-div__mid">
          <p className="pull-div__p">
            {/* <span className="pull-div__bold">Cause: </span> */}
            {!editMode ? (
              cause
            ) : (
              <input
                className="pull-div__input pull-div__input--cause"
                type="text"
                placeholder="Enter cause..."
                value={cause}
                onChange={(e) => {
                  setCause(e.target.value);
                }}
              />
            )}
          </p>

          {!editMode ? (
            notes
          ) : (
            <input
              className="pull-div__input pull-div__input--notes"
              type="text"
              placeholder="Add notes..."
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
              }}
            />
          )}
        </div>

        <div className="pull-div__bottom">
          <p className="pull-div__p pull-div__p--players">
            {!editMode ? (
              playersResponsible
            ) : (
              <input
                className="pull-div__input pull-div__input--players"
                type="text"
                placeholder="Players responsible..."
                value={playersResponsible}
                onChange={(e) => {
                  setPlayersResponsible(e.target.value);
                }}
              />
            )}
          </p>
          {showEdit ? (
            <div className="pull-div__actions-container">
              <button className="pull-div__button" onClick={editPull}>
                {!editMode ? (
                  <i className="fa-regular fa-pen-to-square"></i>
                ) : (
                  <i className="fa-solid fa-check pull__save"></i>
                )}
              </button>
              {allowDelete ? (
                <button
                  className="pull-div__button"
                  //   onClick={() => {
                  //     deletePull(pullData);
                  //   }}
                >
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <PullLink
        logLink={logLink}
        clipLink={clipLink}
        // editMode={editMode}
        // handleLinkModalData={handleLinkModalData}
      />
    </div>
  );
};

export default PullDiv;