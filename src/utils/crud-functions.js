import { supabase } from "../supabase-client";
import { diff } from 'deep-object-diff';

export async function insertPulls(pullsToInsert){
    const {error} = await supabase.from("pulls").insert(pullsToInsert);
    if (error) { 
        console.error("Error adding pulls: ", error);
    };
};

export function getPullsCount(prevPulls, sessionData) {
    const filteredPrevPulls = prevPulls.filter((pull) => 
        pull.ulti == sessionData.ulti && pull.static == sessionData.static
    );
    filteredPrevPulls.sort((a, b) => b.pull_num_overall - a.pull_num_overall);
    return Number(filteredPrevPulls[0].pull_num_overall);
};

export function addPulls(prevPulls, sessionData, pullsArray) {
    const prevPullsCount = getPullsCount(prevPulls, sessionData);

    pullsArray.forEach((pull, index) => {
        delete pull.index
        delete pull.indexToInsert
        delete pull.id
        pull.pull_num_today = Number(index + 1),
        pull.pull_num_overall = Number(index + 1) + prevPullsCount
    });

    insertPulls(pullsArray);
    navigator.clipboard.writeText(localStorage.getItem("pullsFromNewSession"));
    localStorage.removeItem("pullsFromNewSession");
    localStorage.removeItem("sessionInProgress");
};

export async function updatePull(pullID, editedProperties) {
    const { error } = await supabase.from("pulls")
        .update(editedProperties) 
        .eq("id", pullID);
    if (error) {
        console.error("Error updating pull: ", error.message);
        return;
    };
}

export function updateExistingSessionPulls(prevPulls, sessionData, pullsArray) {
    const filteredPrevPulls = prevPulls.filter((pull) => pull.session_num != sessionData.num);
    const prevPullsCount = getPullsCount(filteredPrevPulls, sessionData);

    const pullsToInsert = [];

    pullsArray.forEach((pull, index) => {
        delete pull.index
        delete pull.indexToInsert
        pull.pull_num_today = Number(index + 1),
        pull.pull_num_overall = Number(index + 1) + prevPullsCount

        if (pull.id) { // If pull has an ID property, it means it is already in the database, so we need to update it
            const originalPull = prevPulls.find((ogPull) => ogPull.id == pull.id);
            const editedProperties = diff(originalPull, pull); // diff function returns an object with only the properties that don't match
            if (Object.keys(editedProperties).length != 0) {
                updatePull(pull.id, editedProperties);
            } 
        } else { // If pull does not have an ID property, it is not in the database and needs to be inserted
            pullsToInsert.push(pull);
        };
    });

    insertPulls(pullsToInsert);
    navigator.clipboard.writeText(localStorage.getItem("pullsFromNewSession"));
    localStorage.removeItem("pullsFromNewSession");
    localStorage.removeItem("sessionInProgress");
};

export async function addUserToPlayersTable(newUserData) {
    const {error} = await supabase.from("players").insert(newUserData);
        if (error) { 
            console.error("Error adding pulls: ", error);
        };
};