import axios from "axios";

/**
 * upload image to cloud via signed url
 * @param file
 * @param signedUrl
 */
export const uploadPhotosToSignedUrl = async (file: any, signedUrl: string) => {
  await axios
    .put(signedUrl, file, {
      headers: {
        "Content-Type": "application/octet-stream",
      },
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
  return true;
};
