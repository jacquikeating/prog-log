import { supabase } from "../../supabase-client";
import "./EditLinkModal.scss";

const EditLinkModal = ({ pullState, setPullState }) => {

  function handleLinkModalData(linkType, newLink) {
    if (linkType == "twitch") {
      setPullState({ ...pullState, clip_link: newLink })
    } else if (linkType == "log") {
      setPullState({ ...pullState, log_link: newLink })
    } else if (linkType == "yt") {
      setPullState({ ...pullState, yt_link: newLink })
    } else if (linkType == "img") {
      if (newLink) {
        uploadImage(newLink);
      } else {
        setPullState({ ...pullState, img_link: "" })
      };
    } else if (linkType == "analyzer") {
      setPullState({ ...pullState, analyzer_link: newLink })
    };
  };

  async function uploadImage(file) {
      // To do: Don't upload until checkmark is clicked
  
      const fileName = `${file.name}-${Date.now()}`;
  
      console.log('Uploading...')
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
  
      console.log(data.publicUrl);
      setPullState({ ...pullState, img_link: data.publicUrl })
      return data.publicUrl;
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
            onChange={(e) => handleLinkModalData("twitch", e.target.value)}
          ></input>
        </label>
        <button className="link-modal__delete-btn" onClick={() => handleLinkModalData("twitch", "")}>x</button>
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
            onChange={(e) => handleLinkModalData("yt", e.target.value)}
          ></input>
        </label>
        <button className="link-modal__delete-btn" onClick={() => handleLinkModalData("yt", "")}>x</button>
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
            onChange={(e) => handleLinkModalData("log", e.target.value)}
          />
        </label>
        <button className="link-modal__delete-btn" onClick={() => handleLinkModalData("log", "")}>x</button>
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
            onChange={(e) => handleLinkModalData("analyzer", e.target.value)}
          />
        </label>
        <button className="link-modal__delete-btn" onClick={() => handleLinkModalData("yt", "")}>x</button>
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
            onChange={(e) => handleLinkModalData("img", e.target.value)}
          ></input>
          ) : (<input 
            type="file" 
            className="link-modal__input link-modal__input--file" 
            accept="image/*"
            value={pullState.img_link || ""}
            onChange={(e) => handleLinkModalData("img", e.target.files[0])}
          />)}
        </label>
        {pullState.img_link && <button className="link-modal__delete-btn" onClick={() => handleLinkModalData("img", "")}>x</button>}
      </div>

    </div>
  );
};

export default EditLinkModal;