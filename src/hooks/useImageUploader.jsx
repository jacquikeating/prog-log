import { useState } from "react";

export function useImageUploader() {
    const [imageToUpload, setImageToUpload] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [uploadError, setUploadError] = useState(null);

    // console.log(imageToUpload)

    async function uploadImage() {
      console.log("Hook called!")  
      console.log(imageToUpload)  
        const fileName = `${imageToUpload.name}-${Date.now()}`;
    
        const { error } = await supabase.storage
          .from("screenshots")
          .upload(fileName, imageToUpload);
        
        if (error) {
          console.error(`Error uploading image: ${error.message}.`);
          setUploadError(error.message);
        };
    
        const { data } = await supabase.storage
          .from("screenshots")
          .getPublicUrl(fileName);
    
        setImageURL(data.publicUrl);
      };

    return { uploadImage, imageToUpload, setImageToUpload, imageURL, uploadError };
};