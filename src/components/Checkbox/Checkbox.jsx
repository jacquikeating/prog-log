import "./Checkbox.scss";

const Checkbox = ({ text, state, parent, propertyKey, setterFn, index }) => {
   
    function handleCheck(e) {
        if (parent && parent.length > 0) {
            toggleArrayItem();
        } else if (parent && typeof(parent) == "object") {
            toggleObjectProperty(e);
        };
    };

    function toggleArrayItem() {
        setterFn(index);
    };

    function toggleObjectProperty(e) {
        let parentCopy = {...parent};
        parentCopy[propertyKey] = e.target.checked;
        setterFn(parentCopy);
    };

    return (
        <div className="checkbox">
            <label className="checkbox__label">
                <input
                    type="checkbox"
                    className="checkbox__input"
                    checked={index ? state[index] : state}
                    onChange={(e) => handleCheck(e)}
                />
                    {text}
            </label>
        </div>
    );
};

export default Checkbox;