import firebase_app from "../config";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const db = getFirestore(firebase_app);
if (location.hostname === "localhost") {
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
}
export default db;
