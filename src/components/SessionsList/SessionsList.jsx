import Session from "../Session/Session";
import "./SessionsList.scss";

const SessionsList = ({ sessions }) => {    
    return (
        <ul className="sessions-list">
            {sessions.map((session) => {
                return <Session key={session.id} sessionData={session} />;
            })}
        </ul>
    );
};

export default SessionsList;