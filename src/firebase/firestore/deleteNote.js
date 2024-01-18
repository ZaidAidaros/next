import { deleteDoc, doc } from "firebase/firestore";
import db from "./firestore";

export default async function deleteNote(uid, id) {
  try {
    await deleteDoc(doc(db, "users/" + uid + "/notes/" + id));
    return true;
  } catch (err) {
    return false;
  }
}
