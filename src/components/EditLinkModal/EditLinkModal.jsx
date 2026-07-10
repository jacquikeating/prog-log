import "./EditLinkModal.scss";

const EditLinkModal = ({ logLink, clipLink, ytLink, imgLink, analyzerLink, handleLinkModalData }) => {
  return (
    <div className="link-modal">
      <label className="link-modal__label">
        <img
          src="/50_twitch.png"
          alt="Twitch"
          className="link-modal__icon"
        />
        <input
          id="link-input-twitch"
          type="text"
          className="link-modal__input"
          value={clipLink}
          onChange={(e) => handleLinkModalData("twitch", e.target.value)}
        ></input>
      </label>

      <label className="link-modal__label">
        <img
          src="/50_fflogs.png"
          alt="FFLogs"
          className="link-modal__icon"
        />
        <input
          id="link-input-fflogs"
          type="text"
          className="link-modal__input"
          value={logLink}
          onChange={(e) => handleLinkModalData("log", e.target.value)}
        />
      </label>

      <label className="link-modal__label">
        <img
          src="/yt_icon.jpg"
          alt="YouTube"
          className="link-modal__icon link-modal__icon--yt"
        />
        <input
          id="link-input-yt"
          type="text"
          className="link-modal__input"
          value={ytLink}
          onChange={(e) => handleLinkModalData("yt", e.target.value)}
        ></input>
      </label>

      <label className="link-modal__label">
        <img
          src="/img_icon.png"
          alt="Image"
          className="link-modal__icon"
        />
        <input
          id="link-input-img"
          type="text"
          className="link-modal__input"
          value={imgLink}
          onChange={(e) => handleLinkModalData("img", e.target.value)}
        ></input>
      </label>

      <label className="link-modal__label">
        <img
          src="/analyzer_icon.png"
          alt="Analyzer"
          className="link-modal__icon"
        />
        <input
          id="link-input-analyzer"
          type="text"
          className="link-modal__input"
          value={logLink}
          onChange={(e) => handleLinkModalData("analyzer", e.target.value)}
        />
      </label>
    </div>
  );
};

export default EditLinkModal;