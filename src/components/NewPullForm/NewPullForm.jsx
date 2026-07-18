import { useState } from "react";
import Picker from "react-mobile-picker";
import { checkIfProgPointReached } from "../../utils/shared-functions";
import { getPhaseAndMechOptions } from "../../utils/static-values";
import ScrollPicker from "../ScrollPicker/ScrollPicker";
import "./NewPullForm.scss";

const NewPullForm = ({ sessionData, handlePullFormData }) => {
    const rosterArray = sessionData.roster.split(", ");
    const [selectedPhase, setSelectedPhase] = useState(1);
    const [selectedMech, setSelectedMech] = useState("");
    const [cause, setCause] = useState("");
    const [logLink, setLogLink] = useState("");
    const [clipLink, setClipLink] = useState("");
    const [ytLink, setYtLink] = useState("");
    const [analyzerLink, setAnalyzerLink] = useState("");
    const [imgLink, setImgLink] = useState("");
    const [checkedState, setCheckedState] = useState(new Array(rosterArray.length).fill(false));
    const [responsiblePlayersArray, setResponsiblePlayersArray] = useState([]);
    const [notes, setNotes] = useState("");
    const [insertMode, setInsertMode] = useState(false);
    const [indexToInsert, setIndexToInsert] = useState(0);
    const phaseAndMechOptions = getPhaseAndMechOptions("UMAD");
    const [usePicker, setUsePicker] = useState(false);

    function handlePhaseChange(e) {
        setSelectedPhase(e.target.value);
    };

    function handleMechChange(e) {
        setSelectedMech(e.target.value);
    };

    function handleInsert(e) {
        e.preventDefault();
        setInsertMode(true);
    };

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

    function handleSubmit(e) {
        e.preventDefault();

        const pullObj = {
            static: sessionData.static,
            ulti: sessionData.ulti,
            session_num: Number(sessionData.num),
            phase: selectedPhase,
            mech: selectedMech,
            prog_point_reached: checkIfProgPointReached(sessionData.prog_phase, selectedPhase),
            cause: cause,
            players_responsible: responsiblePlayersArray.join(", "),
            log_link: logLink,
            clip_link: clipLink,
            yt_link: ytLink,
            analyzer_link: analyzerLink,
            img_link: imgLink,
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
        setYtLink("");
        setAnalyzerLink("");
        setImgLink("");
        setIndexToInsert(0);
    }

    return (
        <form className="form">
            {usePicker ? (
                <>
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
                </>
            ) : (
                <div className="form__selects-container">
                    <label className="form__label" htmlFor="phase">
                        Phase
                    </label>
                    <select className="form__select" name="phase" id="phase" onChange={handlePhaseChange} value={selectedPhase}>
                        {phaseAndMechOptions.map((_phase, index) => {
                            if (!index == 0) { 
                                return (
                                    <option value={index} className="form__option">
                                        {index}
                                    </option>
                                )
                            } 
                        })}
                    </select>

                    <label className="form__label" htmlFor="mech">
                        Mechanic
                    </label>
                    <select className="form__select" name="mech" id="mech"  onChange={handleMechChange} value={selectedMech}>
                        {phaseAndMechOptions[selectedPhase].map((mech) => {
                            return (
                                <option value={mech} className="form__option">
                                    {mech}
                                </option>
                            ) 
                        })}
                    </select>
             </div>
            )}

            {/* <button onClick={() => setUsePicker(!usePicker)}>Switch phase select</button> */}
            
            <label className="form__label" htmlFor="cause">
                Cause of Wipe
            </label>
            <input
                className="form__input form__input--text"
                type="text"
                name="cause"
                id="cause"
                value={cause}
                onChange={(e) => {setCause(e.target.value)}}
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
                onChange={(e) => {setLogLink(e.target.value)}}
            />

            <label className="form__label" htmlFor="clip-link">
                Twitch Clip
            </label>
            <input
                className="form__input form__input--text"
                type="text"
                name="clip-link"
                id="clip-link"
                value={clipLink}
                onChange={(e) => {setClipLink(e.target.value)}}
            />

            <label className="form__label" htmlFor="yt-link">
                YouTube Clip
            </label>
            <input
                className="form__input form__input--text"
                type="text"
                name="yt-link"
                id="yt-link"
                value={ytLink}
                onChange={(e) => {setYtLink(e.target.value)}}
            />

            <label className="form__label" htmlFor="analyzer-link">
                Analyzer
            </label>
            <input
                className="form__input form__input--text"
                type="text"
                name="analyzer-link"
                id="analyzer-link"
                value={analyzerLink}
                onChange={(e) => {setAnalyzerLink(e.target.value)}}
            />

            <label className="form__label" htmlFor="img-link">
                Image
            </label>
            <input
                className="form__input form__input--text"
                type="text"
                name="img-link"
                id="img-link"
                value={imgLink}
                onChange={(e) => {setImgLink(e.target.value)}}
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
                onChange={(e) => {setNotes(e.target.value)}}
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
                    <input
                        type="number"
                        value={indexToInsert}
                        onChange={(e) => {setIndexToInsert(e.target.value)}}
                    />
                )}
            </div>
        </form>
    );
};

export default NewPullForm;