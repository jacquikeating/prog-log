import { useState } from "react";
import Picker from "react-mobile-picker";
import { checkIfProgPointReached } from "../../utils/shared-functions";
import "./NewPullForm.scss";

const NewPullForm = ({ sessionData, handlePullFormData }) => {
    const rosterArray = sessionData.roster.split(", ");
    const [selectedPhase, setSelectedPhase] = useState(1);
    const [selectedMech, setSelectedMech] = useState("");
    const [cause, setCause] = useState("");
    const [logLink, setLogLink] = useState("");
    const [clipLink, setClipLink] = useState("");
    const [checkedState, setCheckedState] = useState(new Array(rosterArray.length).fill(false));
    const [responsiblePlayersArray, setResponsiblePlayersArray] = useState([]);
    const [notes, setNotes] = useState("");
    const [insertMode, setInsertMode] = useState(false);
    const [indexToInsert, setIndexToInsert] = useState(0);

    function handlePhaseChange(e) {
        setSelectedPhase(e.phase);
    }

    function handleMechChange(e) {
        setSelectedMech(e.mech);
    }

    function handleInsert(e) {
        e.preventDefault();
        setInsertMode(true);
    }

    const fruPhaseAndMechOptions = [
        ["N/A"],
        ["Opener", "Utopian Sky", "Fall of Faith", "Towers", "P1 Enrage"],
        ["Diamond Dust", "Mirrors", "Light Rampant", "P2 Enrage", "Intermission"],
        ["Ultimate Relativity", "Apocalypse", "P3 Enrage"],
        ["Darklit Dragonsong", "Crystalize Time", "P4 Enrage"],
        ["Fulgent Blade", "Wings Dark and Light", "Polarizing Strikes", "P5 Enrage", "Clear"],
    ];

    const umadPhaseAndMechOptions = [
        ["N/A"],
        ["Dancing", "Mad", "(Ultimate)"],
        ["Don't", "Get", "Bamboozled"],
        ["Idk", "What the Mechs Are", "Maybe Fivesaken", "Or Something"],
        ["The Real", "World Race", "Is Clearing"],
        ["Before", "Xeno", "Clears P1"]
    ]

    let options;
    if (sessionData.ulti == "FRU") {
        options = fruPhaseAndMechOptions
    } else if (sessionData.ulti == "UMAD") {
        options = umadPhaseAndMechOptions
    }

    const handleCheckboxChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
        let responsiblePlayers = [];
        for (let i = 0; i < rosterArray.length; i++) {
            if (updatedCheckedState[i] === true) {
                responsiblePlayers.push(rosterArray[i]);
            }
        }
        setResponsiblePlayersArray(responsiblePlayers);
    };

    function handleSubmit(e) {
        e.preventDefault();

        const pullObj = {
            static: sessionData.static,
            ulti: sessionData.ulti,
            session_id: Number(sessionData.num),
            phase: selectedPhase,
            mech: selectedMech,
            prog_point_reached: checkIfProgPointReached(sessionData.prog_phase, selectedPhase),
            cause: cause,
            players_responsible: responsiblePlayersArray.join(", "),
            log_link: logLink,
            clip_link: clipLink,
            notes: notes,
            indexToInsert: indexToInsert,
        };
        handlePullFormData(pullObj);

        setCause("");
        setCheckedState(new Array(rosterArray.length).fill(false));
        setResponsiblePlayersArray([]);
        setNotes("");
        setLogLink("");
        setClipLink("");
        setIndexToInsert(0);
    }

    return (
        <form className="form">
        <label className="form__label" htmlFor="phase">
            Phase & Mechanic
        </label>

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
                    {options.map((_phase, index) => (
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
                    {options[selectedPhase].map((mech) => (
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
        {/*
            <select className="form__select" name="phase" id="phase">
            <option value="1" className="form__option">
                1
            </option>
            <option value="2" className="form__option">
                2
            </option>
            <option value="3" className="form__option">
                3
            </option>
            <option value="4" className="form__option">
                4
            </option>
            <option value="5" className="form__option">
                5
            </option>
            <option value="6" className="form__option">
                6
            </option>
            <option value="7" className="form__option">
                7
            </option>
            </select>

            <label className="form__label" htmlFor="mech">
            Mechanic
            </label>
            <select className="form__select" name="mech" id="mech">
            <option value="A" className="form__option">
                A
            </option>
            <option value="B" className="form__option">
                B
            </option>
            <option value="C" className="form__option">
                C
            </option>
            </select> */}

        <label className="form__label" htmlFor="cause">
            Cause of Wipe
        </label>
        <input
            className="form__input form__input--text"
            type="text"
            name="cause"
            id="cause"
            value={cause}
            onChange={(e) => {
            setCause(e.target.value);
            }}
        />

        {rosterArray.length ? (
            <fieldset className="form__fieldset">
            <legend className="form__label">Players Involved</legend>
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
            })}
            </fieldset>
        ) : (
            "Loading..."
        )}

        <label className="form__label" htmlFor="log-link">
            Log
        </label>
        <input
            className="form__input form__input--text"
            type="text"
            name="log-link"
            id="log-link"
            value={logLink}
            onChange={(e) => {
            setLogLink(e.target.value);
            }}
        />

        <label className="form__label" htmlFor="clip-link">
            Clip
        </label>
        <input
            className="form__input form__input--text"
            type="text"
            name="clip-link"
            id="clip-link"
            value={clipLink}
            onChange={(e) => {
            setClipLink(e.target.value);
            }}
        />

        <label className="form__label" htmlFor="notes">
            Notes
        </label>
        <input
            className="form__input form__input--text"
            type="text"
            name="notes"
            id="notes"
            value={notes}
            onChange={(e) => {
            setNotes(e.target.value);
            }}
        />

        <button type="submit" className="form__button" onClick={handleSubmit}>
            Save
        </button>

        <div>
            <button className="form__button" onClick={handleInsert}>
            Insert at...
            </button>

            {!insertMode ? (
            ""
            ) : (
            <>
                <input
                type="number"
                value={indexToInsert}
                onChange={(e) => {
                    setIndexToInsert(e.target.value);
                }}
                />
            </>
            )}
        </div>
        </form>
    );
};

export default NewPullForm;