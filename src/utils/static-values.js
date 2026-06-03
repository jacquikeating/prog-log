// Phase and mechanic options for each ultimate. Used in NewPullForm to populate pickers.
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
    ["Opener", "Graven 1", "Graven 2", "Graven 3"],
    ["Don't", "Get", "Bamboozled"],
    ["Idk", "What the Mechs Are", "Maybe Fivesaken", "Or Something"],
    ["The Real", "World Race", "Is Clearing"],
    ["Before", "Xeno", "Clears P1"]
]

export function getPhaseAndMechOptions(ulti){
    if (ulti == "FRU") {
        return fruPhaseAndMechOptions
    } else if (ulti == "UMAD") {
        return umadPhaseAndMechOptions
    }
}