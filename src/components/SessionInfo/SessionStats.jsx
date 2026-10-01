import { useContext } from "react";
import { SessionContext, EditContext } from "../../pages/ReportPage/ReportPage.jsx";
import {
  findGoldStars,
  findStrugglePhase,
  findStruggleMech,
} from "../../utils/shared-functions.js";

const SessionStats = () => {
  const { sessionCtx } = useContext(SessionContext);
  const { editCtx } = useContext(EditContext);
  const { session, pullsArray } = sessionCtx;
  const { user } = editCtx;

  function displayGoldStars() {
    if (session.id == 76) {
      return (
        <p className="report__extra-info">
          <span className="report__extra-info--bold">⬆️ Star: </span>
          Sophia
        </p>
      );
    } else if (user?.permissions == "admin") {
      return (
        <p className="report__extra-info">
          <span className="report__extra-info--bold">Gold Stars: </span>
          {findGoldStars(pullsArray, session.roster)}
        </p>
      );
    } else if (session.show_pulls) {
        <p className="report__extra-info">
          <span className="report__extra-info--bold">Gold Stars: </span>
          {findGoldStars(pullsArray, session.roster)}
        </p>
    };
  };

  return (
    <>
      <p className="report__extra-info">
        <span className="report__extra-info--bold">Most Wipes: </span>
        Phase {findStrugglePhase(pullsArray)}
        <span className="report__divider"> • </span>
        {findStruggleMech(pullsArray)}
      </p>

      {displayGoldStars()}
    </>
  );
};

export default SessionStats;