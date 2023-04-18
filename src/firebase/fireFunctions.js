import { db } from "./firebase";

export const updateFirebase = (name, value, path) => {
  const washingtonRef = db.collection("users").doc(`${path}`);
  return washingtonRef
    .update({
      [name]: value,
    })
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
};
