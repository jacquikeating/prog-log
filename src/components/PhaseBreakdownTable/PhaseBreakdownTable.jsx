import "./PhaseBreakdownTable.scss";

const PhaseBreakdownTable = () => {
  function getPhaseBreakdown() {
    // Normally, phasesReached will initialize as empty, then fill from the pulls array.
    // Temporarily using hardcoded values.
    let phasesReached = [1, 2, 3, 1, 2, 2, 1, 3];

    // pulls.map((pull) => {
    //   phasesReached.push(pull.phase);
    // });

    let phaseBreakdown = phasesReached.reduce((accumulator, phase) => {
      return (
        accumulator[phase] ? ++accumulator[phase] : (accumulator[phase] = 1),
        accumulator
      );
    }, {});

    return phaseBreakdown;
  }

  const phaseBreakdown = getPhaseBreakdown();
  console.log(phaseBreakdown)

  let phasesArray = [
    phaseBreakdown[1] ? phaseBreakdown[1] : 0,
    phaseBreakdown[2] ? phaseBreakdown[2] : 0,
    phaseBreakdown[3] ? phaseBreakdown[3] : 0,
    phaseBreakdown[4] ? phaseBreakdown[4] : 0,
    phaseBreakdown[5] ? phaseBreakdown[5] : 0,
  ];

  let counter = 1;
  let counter2 = 1;

  return (
    <div className="phases-table">
      <table className="phases-table__table">
        <tbody>
          <tr className="phases-table__row">
            <th className="phases-table__header">Phase</th>
            {phasesArray.map(() => {
              let phaseNum = counter++;
              return (
                <td
                  key={phaseNum}
                  className={`phases-table__cell`}
                >
                  {phaseNum}
                </td>
              );
            })}
          </tr>

          <tr className="phases-table__row">
            <th className="phases-table__header">Pulls</th>
            {phasesArray.map((numberOfWipes) => {
              let phaseNum = counter2++;
              return (
                <td
                  key={phaseNum}
                  className={`phases-table__cell`}
                >
                  {numberOfWipes}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PhaseBreakdownTable;