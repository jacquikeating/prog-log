import { useState } from "react";
import EditLinkModal from "../EditLinkModal/EditLinkModal";
import "./PullLink.scss";

const PullLink = ({ pullState, setPullState, editMode }) => {
  const [showModal, setShowModal] = useState(false);

  function toggleLinkModal() {
    setShowModal(!showModal);
  };

  return (
    <div className="pull-link__cell">
      { pullState.log_link ? (
        <a
          className="pull-link__link"
          href={pullState.log_link}
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
        <a
          className="pull-link__link"
          href={pullState.clip_link}
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
        <a
          className="pull-link__link"
          href={pullState.yt_link}
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
        <a
          className="pull-link__link"
          href={pullState.img_link}
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
        <a
          className="pull-link__link"
          href={pullState.analyzer_link}
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
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default PullLink;