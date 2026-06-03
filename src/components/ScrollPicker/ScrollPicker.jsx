import Picker from "react-mobile-picker";
import "./ScrollPicker.scss"

const ScrollPicker = ({ selectedPhase, handlePhaseChange, phaseAndMechOptions, selectedMech, handleMechChange }) => {

    return (
        <div className="form__pickers-container">
            <Picker
                value={selectedPhase}
                onChange={handlePhaseChange}
                wheelMode="natural"
                height={90}
                itemHeight={30}
                className="form__picker"
            >
                <Picker.Column key="phase" name="phase">
                    {phaseAndMechOptions.map((_phase, index) => (
                        <Picker.Item
                            key={index}
                            value={index}
                            className="form__picker-option"
                            style={selectedPhase == index && {color: "#b38cff"}}
                        >
                            {index}
                        </Picker.Item>
                    ))}
                </Picker.Column>
            </Picker>

            <Picker
                value={selectedMech}
                onChange={handleMechChange}
                wheelMode="natural"
                height={90}
                itemHeight={30}
                className="form__picker"
            >
                <Picker.Column key="mech" name="mech">
                    {phaseAndMechOptions[selectedPhase].map((mech) => (
                        <Picker.Item
                            key={mech}
                            value={mech}
                            className="form__picker-option"
                            style={selectedMech == mech && {color: "#b38cff"}}
                        >
                            {mech}
                        </Picker.Item>
                    ))}
                </Picker.Column>
            </Picker>
        </div> 
    )
}

export default ScrollPicker;