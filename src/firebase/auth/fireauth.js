import firebase_app from "../config";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const auth = getAuth(firebase_app);
if (location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
}
export default auth;
