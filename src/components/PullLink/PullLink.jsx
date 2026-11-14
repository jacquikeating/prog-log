import { useState } from "react";
import EditLinkModal from "../EditLinkModal/EditLinkModal";
import "./PullLink.scss";

const PullLink = ({ /* logLink, clipLink, ytLink, imgLink, analyzerLink, */ pullState, setPullState, editMode, handleLinkModalData }) => {
  const [showModal, setShowModal] = useState(false);

  function toggleLinkModal() {
    setShowModal(!showModal);
  };

  return (
    <div className="pull-link__cell">
      { pullState.log_link ? (
      // logLink ? (
        <a
          className="pull-link__link"
          href={pullState.log_link}
          // href={logLink}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="/50_fflogs.png"
            className="pull-link__icon"
          />
        </a>
      ) : (
        ""
      )}

      { pullState.clip_link ? (
      // clipLink  ? (
        <a
          className="pull-link__link"
          href={pullState.clip_link}
          // href={clipLink}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="/50_twitch.png"
            className="pull-link__icon"
          />
        </a>
      ) : (
        ""
      )}

      { pullState.yt_link ? (
      // ytLink ? (
        <a
          className="pull-link__link"
          href={pullState.yt_link}
          // href={ytLink}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="/yt_icon.jpg"
            className="pull-link__icon pull-link__icon--yt"
          />
        </a>
      ) : (
        ""
      )}

      { pullState.img_link ? (
      // imgLink ? (
        <a
          className="pull-link__link"
          href={pullState.img_link}
          // href={imgLink}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="/img_icon.png"
            className="pull-link__icon"
          />
        </a>
      ) : (
        ""
      )}

      { pullState.analyzer_link ? (
      // analyzerLink ? (
        <a
          className="pull-link__link"
          href={pullState.analyzer_link}
          // href={analyzerLink}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="/analyzer_icon.png"
            className="pull-link__icon"
          />
        </a>
      ) : (
        ""
      )}

      {!editMode ? (
        ""
      ) : (
        <button className="pull-link__add-link-btn" onClick={toggleLinkModal}>
          {!showModal ? (
            <i className="fa-solid fa-plus"></i>
          ) : (
            <i className="fa-solid fa-check"></i>
          )}
        </button>
      )}

      {editMode && showModal ? (
        <EditLinkModal
          pullState={pullState}
          setPullState={setPullState}
          // logLink={logLink}
          // clipLink={clipLink}
          // ytLink={ytLink}
          // imgLink={imgLink}
          // analyzerLink={analyzerLink}
          handleLinkModalData={handleLinkModalData}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default PullLink;