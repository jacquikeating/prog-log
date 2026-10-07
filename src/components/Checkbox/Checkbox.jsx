import "./Checkbox.scss";

const Checkbox = ({ text, state, parent, setterFn }) => {
    return (
        <label>
            <input
                type="checkbox"
                // checked={state} // temporarily disabled for testing
                onChange={(e) => {
                    console.log(`${text} dummy checkbox is now ${e.target.checked ? "checked" : "unchecked"}`);
                    
                    if (parent && typeof(parent) == "object") {
                        console.log(`${text} is a property in`, parent);
                        // call setterFn() to manipulate state
                    };
                }}
            />
                {text}
        </label>
    );
};

export default Checkbox;

/* Example of an object-altering checkbox
    onChange={(e) => {
        setSession((prevSession) => {
            return { ...prevSession, show_pulls: e.target.checked };
        })
*/

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