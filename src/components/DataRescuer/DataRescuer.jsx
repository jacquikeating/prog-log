import { useState } from "react";
import { supabase } from "../../supabase-client";
import { getPullsCount, insertPulls } from "../../utils/crud-functions.js";
import { useNavigate } from 'react-router-dom';
import "./DataRescuer.scss";

const DataRescuer = ({ sessions, prevPulls }) => {
    // NOTE TO SELF: Update with ulti/static filtering when that feature is implemented.
    
    const [pastedPulls, setPastedPulls] = useState("");
    const [prevPullsCount, setPrevPullsCount] = useState(getPullsCount(prevPulls, sessions[0]));
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
                pull.pull_num_overall = Number(index + 1) + prevPullsCount
            });

        // Confirm data looks correct before attempting to reupload. That's why this is a separate function!
        const examplePull = [...prevPulls][0];
        delete examplePull.id; // Not showing this since id column needs to be absent from new data (auto-incremented in DB)
        console.log(`Here's an example pull for comparison:`);
        console.log(examplePull);
        console.log(`And here's what your new pulls look like:`)
        console.log(rescuedData);
        return rescuedData;
    }

    function uploadRescuedData(preparedRescuedPulls) {
        insertPulls(preparedRescuedPulls);
        navigator.clipboard.writeText(preparedRescuedPulls);
        navigate(`/report/${preparedRescuedPulls[0].session_num}`);
    }

    return (
        <section className="data-rescuer">
            <h2>Reupload Pulls Data</h2>
            <p>Had an error when uploading pulls? Don't worry, it's fixable!</p>
            
            <div className="data-rescuer__step">
                <h3>Step 1: Paste clipboard data</h3>
                <p>On your original attempt to upload pulls, an array of data should have automatically saved to your clipboard. Drop it in here.</p>
                <textarea className="data-rescuer__textarea" value={pastedPulls} onChange={(e) => setPastedPulls(e.target.value)}></textarea>
            </div>
           
            <div className="data-rescuer__step">
                <h3>Step 2: Confirm existing pulls count</h3>
                <p>Let's double-check that the overall pulls count (BEFORE adding these) is correct. If it looks good, skip on ahead. If not, manually change it here.</p>
                <input className="data-rescuer__num-input" type="number" value={prevPullsCount} onChange={(e) => setExistingPullsCount(e.target.value)}></input>
            </div>
            
            <div className="data-rescuer__step">
                <h3>Step 3: Process data</h3>
                <p>Because something probably went wrong the first time, we have two separate functions to process the data and to upload it. Open your console and confirm the data-processing fairies are doing their job right. If all the properties match, you're good to go.</p>
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