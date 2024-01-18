import db from "./firestore";
import { addDoc, collection, doc } from "firebase/firestore";

export default async function addNote(uid, data) {
  let result = null;
  let error = null;

  try {
    result = await addDoc(collection(db, "users/" + uid + "/notes"), data);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
