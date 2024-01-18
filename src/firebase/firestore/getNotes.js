import db from "./firestore";
import { getDocs, query, collection, orderBy, limit } from "firebase/firestore";

export default async function getNotes(uid) {
  let notes = [];
  let error = null;

  try {
    const q = query(
      collection(db, "users/" + uid + "/notes"),
      orderBy("noteDate", "desc"),
      limit(15)
    );
    const docs = (await getDocs(q)).docs;
    if (docs.length) {
      docs.forEach((doc) =>
        notes.push({
          id: doc.id,
          title: doc.data().title,
          note: doc.data().note,
          noteDate: doc.data().noteDate,
        })
      );
    }
  } catch (e) {
    error = e;
  }

  return { notes, error };
}
