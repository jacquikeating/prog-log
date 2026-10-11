import "./Checkbox.scss";

const Checkbox = ({ text, state, parent, propertyKey, setterFn, indexString }) => {
   
    let index = Number(indexString) || null;
    /*  When indices are passed through props as a number, 0 evaluates to falsy, causing bugs with the first array item.
        Workaround: indices are passed as strings, then converted to numbers.  */

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
        <label>
            <input
                type="checkbox"
                checked={indexString ? state[index] : state}
                onChange={(e) => handleCheck(e)}
            />
                {text}
        </label>
    );
};

export default Checkbox;