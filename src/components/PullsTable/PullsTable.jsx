import { useState } from "react";
import Pull from "../Pull/Pull";
import PullDiv from "../PullDiv/PullDiv";
import "./PullsTable.scss";

const PullsTable = ({
  pullsArray,
  showEdit,
  updatePull,
  deletePull,
  progPhase,
  allowDelete,
  width,
  breakpoint,
}) => {
  const [pullNumType, setPullNumType] = useState("today");

  function togglePullNumType() {
    if (pullNumType === "today") {
      setPullNumType("overall");
    } else {
      setPullNumType("today");
    }
  }

  const columns = [/* "dur", */ "p", "mechanic", "cause", "players", "notes"];

  return (
    <>
      {width < breakpoint ? (
        pullsArray.map((pull, index) => {
          return (
            <PullDiv
              pullData={{ ...pull, index: index }}
              pullNumType={pullNumType}
              showEdit={showEdit}
              updatePull={updatePull}
              deletePull={deletePull}
              progPhase={progPhase}
              key={pull.pull_num_today || index}
              allowDelete={allowDelete}
            />
          );
        })
      ) : (
        <div className="pulls-table">
          <table className="pulls-table__table">
            <tbody>
              <tr className="pulls-table__header-row">
                <th
                  className="pulls-table__header-cell"
                  onClick={togglePullNumType}
                >
                  #
                </th>
                {columns.map((column) => {
                  return (
                    <th
                      key={column}
                      className={`pulls-table__header-cell pulls-table__header-cell--${column}`}
                    >
                      {column}
                    </th>
                  );
                })}
                {showEdit ? (
                  <th className="pulls-table__header-cell pulls-table__header-cell--edit">
                    Edit
                  </th>
                ) : (
                  ""
                )}
              </tr>
              {pullsArray.map((pull, index) => {
                return (
                  <Pull
                    pullData={{ ...pull, index: index }}
                    pullNumType={pullNumType}
                    showEdit={showEdit}
                    updatePull={updatePull}
                    deletePull={deletePull}
                    progPhase={progPhase}
                    key={pull.pull_num_today || index}
                    allowDelete={allowDelete}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default PullsTable;