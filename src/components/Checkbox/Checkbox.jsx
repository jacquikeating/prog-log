import "./Checkbox.scss";

const Checkbox = ({ text, state, parent, propertyKey, setterFn, idx }) => {

    function handleCheck(e) {
        if (parent && parent.length > 0) {
            toggleArrayItem(e);
        } else if (parent && typeof(parent) == "object") {
            toggleObjectProperty(e);
        };
    };

    function toggleArrayItem(e) {
        setterFn(idx);
    };

    function toggleObjectProperty(e) {
        let parentCopy = {...parent};
        parentCopy[propertyKey] = e.target.checked;
        setterFn(parentCopy);
    };

    return (
        <label>
            <input
                type="checkbox"
                checked={idx ? state[idx] : state}
                onChange={(e) => handleCheck(e)}
            />
                {text}
        </label>
    );
};

export default Checkbox;

/* How checkboxes are handled in NewPullForm (array-altering)
    {rosterArray.map((player, index) => {
        return (
            <label className="form__label" htmlFor={player} key={index}>
                <input
                    className="form__checkbox"
                    type="checkbox"
                    name={player}
                    id={player}
                    value={player}
                    checked={checkedState[index]}
                    onChange={() => handleCheckboxChange(index)}
                />
                {player}
            </label>
        );
    })};

    const handleCheckboxChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
        let responsiblePlayers = [];
        for (let i = 0; i < rosterArray.length; i++) {
            if (updatedCheckedState[i] === true) {
                responsiblePlayers.push(rosterArray[i]);
            };
        };
        setResponsiblePlayersArray(responsiblePlayers);
    };
*/