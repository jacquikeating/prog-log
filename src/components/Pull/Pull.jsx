import { useState } from "react";
import { supabase } from "../../supabase-client";
import { checkIfProgPointReached } from "../../utils/shared-functions";
import PullLink from "../PullLink/PullLink";
import "./Pull.scss";

const Pull = ({
  pullData,
  pullNumType,
  showEdit,
  updatePull,
  deletePull,
  progPhase,
  allowDelete,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [pullState, setPullState] = useState(structuredClone(pullData));
  const [imageToUpload, setImageToUpload] = useState(null);
  const index = pullData.index;

  function saveChanges() {
      updatePull({
        ...pullState, 
        prog_point_reached: checkIfProgPointReached(progPhase, pullState.phase)
      });
    setEditMode(false);
  };

  return (
    <tr
      key={`pull-${index}`}
      className={pullState.mech === "Clear" ? "pull pull--clear" : "pull"}
    >
      <td key={`#${index}`} className="pull__cell pull__cell--num-today">
        {pullNumType === "today"
          ? pullData.pull_num_today || index + 1
          : pullData.pull_num_overall}
      </td>

      {!editMode ? (
        <>
          <td key={`#${index}`} className="pull__cell pull__cell--phase">
            {pullState.phase}
          </td>

          <td key={`${index}-mech`} className="pull__cell pull__cell--mech">
            {pullState.mech}
          </td>

          <td key={`${index}-cause`} className="pull__cell pull__cell--cause">
            {pullState.cause}
          </td>

          <td
            key={`${index}-players`}
            className="pull__cell pull__cell--players"
          >
            {pullState.players_responsible}
          </td>

          <td key={`${index}-notes`} className="pull__cell pull__cell--notes">
            {pullState.notes}
          </td>
        </>
      ) : (
        <>
          <td key={`#${index}`} className="pull__cell pull__cell--phase">
            <input
              className="pull__input pull_input--number"
              type="number"
              value={pullState.phase}
              onChange={(e) => {
                setPullState({ ...pullState, phase: e.target.value });
              }}
            />
          </td>

          <td key={`${index}-mech`} className="pull__cell pull__cell--mech">
            <input
              className="pull__input"
              type="text"
              value={pullState.mech}
              onChange={(e) => {
                setPullState({ ...pullState, mech: e.target.value });
              }}
            />
          </td>

          <td key={`${index}-cause`} className="pull__cell pull__cell--cause">
            <input
              className="pull__input"
              type="text"
              value={pullState.cause}
              onChange={(e) => {
                setPullState({ ...pullState, cause: e.target.value });
              }}
            />
          </td>

          <td
            key={`${index}-players`}
            className="pull__cell pull__cell--players"
          >
            <input
              className="pull__input"
              type="text"
              value={pullState.players_responsible}
              onChange={(e) => {
                setPullState({ ...pullState, players_responsible: e.target.value });
              }}
            />
          </td>

          <td key={`${index}-notes`} className="pull__cell pull__cell--notes">
            <input
              className="pull__input"
              type="text"
              value={pullState.notes}
              onChange={(e) => {
                setPullState({ ...pullState, notes: e.target.value });
              }}
            />
          </td>
        </>
      )}

      {showEdit ? (
        <td key={`${index}-edit`} className="pull__cell pull__cell--edit">
          <div className="pull__cell-container">
            {editMode ? (
              <button className="pull__button" onClick={saveChanges}>
                <i className="fa-solid fa-check pull__save"></i>
            </button>
            ) : (
              <button className="pull__button" onClick={() => setEditMode(true)}>
                <i className="fa-regular fa-pen-to-square"></i>
            </button>
            )}
            
            {allowDelete ? (
              <button
                className="pull__button"
                onClick={() => {
                  deletePull(pullData);
                }}
              >
                <i className="fa-regular fa-trash-can"></i>
              </button>
            ) : (
              ""
            )}
          </div>
        </td>
      ) : (
        ""
      )}
      <PullLink
        pullState={pullState}
        setPullState={setPullState}
        setImageToUpload={setImageToUpload}
        editMode={editMode}
      />
    </tr>
  );
};

export default Pull;