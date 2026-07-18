import { useState } from "react";
import EditLinkModal from "../EditLinkModal/EditLinkModal";
import "./PullLink.scss";

const PullLink = ({ logLink, clipLink, ytLink, imgLink, analyzerLink, editMode, handleLinkModalData }) => {
  const [showModal, setShowModal] = useState(false);

  function toggleLinkModal() {
    setShowModal(!showModal);
  };

  return (
    <div className="pull-link__cell">
      {logLink ? (
        <a
          className="pull-link__link"
          href={logLink}
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

      {clipLink  ? (
        <a
          className="pull-link__link"
          href={clipLink}
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

      {ytLink ? (
        <a
          className="pull-link__link"
          href={ytLink}
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

      {imgLink ? (
        <a
          className="pull-link__link"
          href={imgLink}
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

      {analyzerLink ? (
        <a
          className="pull-link__link"
          href={analyzerLink}
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
          logLink={logLink}
          clipLink={clipLink}
          ytLink={ytLink}
          imgLink={imgLink}
          analyzerLink={analyzerLink}
          handleLinkModalData={handleLinkModalData}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default PullLink;