import { supabase } from "../supabase-client";

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

export async function addUserToPlayersTable(newUserData) {
    const {error} = await supabase.from("players").insert(newUserData);
        if (error) { 
            console.error("Error adding pulls: ", error);
        };
};