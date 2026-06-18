// Phase and mechanic options for each ultimate. Used in NewPullForm to populate pickers.
export const fruPhaseAndMechOptions = [
    ["N/A"],
    ["Opener", "Utopian Sky", "Fall of Faith", "Towers", "P1 Enrage"],
    ["Diamond Dust", "Mirrors", "Light Rampant", "P2 Enrage", "Intermission"],
    ["Ultimate Relativity", "Apocalypse", "P3 Enrage"],
    ["Darklit Dragonsong", "Crystalize Time", "P4 Enrage"],
    ["Fulgent Blade", "Wings Dark and Light", "Polarizing Strikes", "P5 Enrage", "Clear"],
];

export const flatFruMechs = fruPhaseAndMechOptions.flat().slice(1);

export const umadPhaseAndMechOptions = [
    ["N/A"],
    ["Opener", "Graven 1", "Graven 2", "Graven 3", "P1 Enrage"],
    ["Forsaken", "Triness"],
    ["Idk", "What the Mechs Are", "Maybe Fivesaken", "Or Something"],
    ["The Real", "World Race", "Is Clearing"],
    ["Before", "Xeno", "Clears P1"]
];

export const flatUmadMechs = umadPhaseAndMechOptions.flat().slice(1);

export function getPhaseAndMechOptions(ulti){
    if (ulti.toLowerCase() == "fru") {
        return fruPhaseAndMechOptions
    } else if (ulti.toLowerCase() == "umad") {
        return umadPhaseAndMechOptions
    };
};