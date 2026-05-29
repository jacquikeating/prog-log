import "./EditLinkModal.scss";

const EditLinkModal = ({ logLink, clipLink, handleLinkModalData }) => {
  return (
    <div className="link-modal">
      <label className="link-modal__label">
        <img
          src="https://i.imgur.com/NzRUemQ.png"
          alt="Twitch"
          className="link-modal__icon"
        />
        <input
          id="link-input-twitch"
          type="text"
          className="link-modal__input"
          value={clipLink}
          onChange={(e) => handleLinkModalData(logLink, e.target.value)}
        ></input>
      </label>

      <label className="link-modal__label">
        <img
          src="https://i.imgur.com/asZe3Wu.png"
          alt="FFLogs"
          className="link-modal__icon"
        />
        <input
          id="link-input-fflogs"
          type="text"
          className="link-modal__input"
          value={logLink}
          onChange={(e) => handleLinkModalData(e.target.value, clipLink)}
        />
      </label>
    </div>
  );
};

export default EditLinkModal;