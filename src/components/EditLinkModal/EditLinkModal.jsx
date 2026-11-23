import { supabase } from "../../supabase-client";
import "./EditLinkModal.scss";

const EditLinkModal = ({ pullState, setPullState, setImageToUpload }) => {

  async function uploadImage(file) {
    // To do: Don't upload until checkmark is clicked
    const fileName = `${file.name}-${Date.now()}`;

    const { error } = await supabase.storage
      .from("screenshots")
      .upload(fileName, file);
    if (error) {
      console.error(`Error uploading image: ${error.message}.`);
      return;
    };

    const { data } = await supabase.storage
      .from("screenshots")
      .getPublicUrl(fileName);

    setPullState({ ...pullState, img_link: data.publicUrl });
  };

  return (
    <div className="link-modal">

      <div className="link-modal__link">
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
            value={pullState.clip_link || ""}
            onChange={(e) => setPullState({ ...pullState, clip_link: e.target.value })}
          ></input>
        </label>
        <button className="link-modal__delete-btn" onClick={() => setPullState({ ...pullState, clip_link: "" })}>x</button>
      </div>

      <div className="link-modal__link">
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
            value={pullState.yt_link || ""}
            onChange={(e) => setPullState({ ...pullState, yt_link: e.target.value })}
          ></input>
        </label>
        <button className="link-modal__delete-btn" onClick={() => setPullState({ ...pullState, yt_link: "" })}>x</button>
      </div>
      
      <div className="link-modal__link">
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
            value={pullState.log_link || ""}
            onChange={(e) => setPullState({ ...pullState, log_link: e.target.value })}
          />
        </label>
        <button className="link-modal__delete-btn" onClick={() => setPullState({ ...pullState, log_link: "" })}>x</button>
      </div>

      <div className="link-modal__link">
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
            value={pullState.analyzer_link || ""}
            onChange={(e) => setPullState({ ...pullState, analyzer_link: e.target.value })}
          />
        </label>
        <button className="link-modal__delete-btn" onClick={() => setPullState({ ...pullState, analyzer_link: "" })}>x</button>
      </div>

      <div className="link-modal__link">
        <label className="link-modal__label">
          <img
            src="/img_icon.png"
            alt="Image"
            className="link-modal__icon"
          />
          { pullState.img_link ? (
            <input
            id="link-input-img"
            type="text"
            className="link-modal__input"
            value={pullState.img_link || ""}
            onChange={(e) => setPullState({ ...pullState, img_link: e.target.value })}
          ></input>
          ) : (<input 
            type="file" 
            className="link-modal__input link-modal__input--file" 
            accept="image/*"
            value={pullState.img_link || ""}
            onChange={(e) => uploadImage(e.target.files[0])}
          />)}
        </label>
        {pullState.img_link && <button className="link-modal__delete-btn" onClick={() => setPullState({ ...pullState, img_link: "" })}>x</button>}
      </div>

    </div>
  );
};

export default EditLinkModal;