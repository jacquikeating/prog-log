import { useState } from "react";
import { supabase } from "../../supabase-client";
import { useNavigate } from 'react-router-dom';

const DataRescuer = () => {
    const [pastedPulls, setPastedPulls] = useState(null);
    const [existingPullsCount, setExistingPullsCount] = useState(Number(localStorage.getItem("existingPullsCount")) || 0)
    const navigate = useNavigate();

    function prepRescuedData() {
        // Get data pasted into textarea.
            const pastedData = pastedPulls;
            const rescuedData = JSON.parse(pastedData);

        // Process data to make its properties match the database columns.
            rescuedData.forEach((pull, index) => {
                delete pull.index
                delete pull.indexToInsert
                if (pull.session_id) {
                    pull.session_num = pull.session_id
                    delete pull.session_id
                }
                pull.pull_num_today = Number(index + 1),
                pull.pull_num_overall = Number(index + 1) + existingPullsCount,
                pull.static = "wall-is-safe", // Replace as necessary
                pull.ulti = "umad" // Replace as necessary
            });

        // Confirm data looks correct before attempting to reupload. That's why this is a separate function!
        console.log(rescuedData);
        return rescuedData;
    }

    function uploadRescuedData(preparedRescuedPulls) {
        // This is a modified copy of AddDataPage's handleSubmit().
            async function insertPulls(){
                const {error} = await supabase.from("pulls").insert(preparedRescuedPulls);
                if (error) { 
                    console.error("Error adding pulls: ", error);
                }
            }

            insertPulls();
            const lastPullNumOverall = preparedRescuedPulls[preparedRescuedPulls.length - 1].pull_num_overall;
            localStorage.setItem("existingPullsCount", lastPullNumOverall);
            navigator.clipboard.writeText(preparedRescuedPulls);
            navigate(`/report/${preparedRescuedPulls[0].session_num}`);
    }

    return (
        <section>
            <h2>Reupload Pulls Data</h2>
            <p>Had an error when uploading pulls? Don't worry! An array of pulls data should have automatically saved to your clipboard.</p>
            
            <div className="data-rescuer__step">
                <h3>Step 1: Paste clipboard data</h3>
                <textarea className="data-rescuer__textarea" value={pastedPulls} onChange={(e) => setPastedPulls(e.target.value)}></textarea>
            </div>
           
            <div className="data-rescuer__step">
                <h3>Step 2: Confirm existing pulls count</h3>
                <p>Let's double-check that the overall pulls count (BEFORE adding these) is correct. If it looks good, skip on ahead. If not, manually change it here.</p>
                <input type="number" value={existingPullsCount} onChange={(e) => setExistingPullsCount(e.target.value)}></input>
            </div>
            
            <div className="data-rescuer__step">
                <h3>Step 3: Process data</h3>
                <p>Because something probably went wrong the first time, we have two separate functions to process the data and to upload it. Open your console and confirm the data-processing fairies are doing their job right.</p>
                <button onClick={prepRescuedData}>
                    Prep data for upload
                </button>
            </div>

            <div className="data-rescuer__step">
                <h3>Step 4: Upload!</h3>
                <p>Looks good? Let's try and upload again!</p>           
                <button onClick={() => uploadRescuedData(prepRescuedData())}>
                    Upload data
                </button>
            </div>
        </section>
    )
};

export default DataRescuer;