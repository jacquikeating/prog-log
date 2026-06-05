import { useState, useContext, useEffect } from "react";
import { SessionContext, PullsContext, EditContext } from "../../pages/ReportPage/ReportPage.jsx";
import { getPullsAtProgPoint } from "../../utils/shared-functions.js";
import PullsTable from "../PullsTable/PullsTable.jsx";

const PullsSection = () => {
  const { sessionCtx } = useContext(SessionContext);
  const { session, sessionNum, pullsArray } = sessionCtx;
  const { editCtx } = useContext(EditContext);
  const {
    editMode,
    setEditMode,
    showEdit,
    allowDelete,
    updatePull,
    deletePull,
    pullToUpdate,
    setPullsArray,
  } = editCtx;
  const { pullsCtx } = useContext(PullsContext);
  const { width, breakpoint, pulls, isPending } = pullsCtx;

  const [progPullsOnly, setProgPullsOnly] = useState(false);
  const [pullsToDisplay, setPullsToDisplay] = useState(pulls);

  useEffect(() => {
    if (!isPending) {
      setPullsToDisplay(pulls.filter((pull) => pull.session_num == sessionNum));
    }
  }, [isPending]);

  function handleCheckbox() {
    if (progPullsOnly) {
      setProgPullsOnly(false);
    } else {
      setProgPullsOnly(true);
    }
  };

  function filterPulls(name) {
    const arrayFilteredByPlayer = [...pullsArray].filter((pull) =>
      pull.players_responsible.includes(name)
    );
    setPullsToDisplay(arrayFilteredByPlayer);
  };

  function getPullsCount() {
    if (pulls.length == pullsToDisplay.length) {
      return pulls.length;
    } else {
      return `${pullsToDisplay.length} of ${pulls.length}`;
    };
  };

  return (
    <section className="report__section">
      <div className="report__pulls-heading">
        <h2 className="report__subheading">Pulls ({getPullsCount()})</h2>

        <label className="report__filter-label" htmlFor="progOnlyCheckbox">
          <input
            type="checkbox"
            name="progOnlyCheckbox"
            id="progOnlyCheckbox"
            className="report__filter-input"
            value={progPullsOnly}
            onChange={handleCheckbox}
          />
          Show prog pulls only
        </label>

        <label className="report__filter-label" htmlFor="playerSelect">
          <select
            name="playerSelect"
            id="playerSelect"
            className="report__filter-input"
            onChange={(e) => {
              filterPulls(e.target.value);
            }}
          >
            <option value={""}>--</option>
            {session.roster.split(", ").map((player) => {
              return (
                <option
                  className="report__filter-option"
                  value={player}
                  key={player}
                >
                  {player}
                </option>
              );
            })}
          </select>
          Filter by player
        </label>
      </div>

      <PullsTable
        pullsArray={
          progPullsOnly ? getPullsAtProgPoint(pullsToDisplay, session.prog_mech) : pullsToDisplay
        }
        showEdit={showEdit}
        updatePull={updatePull}
        deletePull={deletePull}
        progPhase={session.prog_phase}
        key={pullsArray}
        allowDelete={allowDelete}
        width={width}
        breakpoint={breakpoint}
      />
    </section>
  );
};

export default PullsSection;