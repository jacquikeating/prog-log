import { supabase } from "../supabase-client";

export async function insertPulls(pullsToInsert){
    const {error} = await supabase.from("pulls").insert(pullsToInsert);
    if (error) { 
        console.error("Error adding pulls: ", error);
    };
};

export function addPulls(prevPulls, sessionData, pullsArray) {

    function getPullsCount() {
        const filteredPrevPulls = prevPulls.filter((pull) => 
            pull.ulti == sessionData.ulti && pull.static == sessionData.static
        );
        filteredPrevPulls.sort((a, b) => b.pull_num_overall - a.pull_num_overall)
        return filteredPrevPulls[0].pull_num_overall
    };

    function preparePullsForBackend() {
        const copyArray = [...pullsArray];
        const numberedPulls = copyArray.map((pull, index) => (
            {
                ...pull,
                pull_num_today: Number(index + 1),
                pull_num_overall: Number(index + 1) + getPullsCount(),
            }));
        return numberedPulls;
    };

    const preparedPulls = preparePullsForBackend();
    insertPulls(preparedPulls);
    navigator.clipboard.writeText(localStorage.getItem("pullsFromNewSession"));
    localStorage.removeItem("pullsFromNewSession");
    localStorage.removeItem("sessionInProgress");
};