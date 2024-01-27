import auth from "./fireauth";
import { sendEmailVerification } from "firebase/auth";

export default async function sendEmailVerifyLink() {
  let result = null,
    error = null;
  try {
    result = await sendEmailVerification(auth.currentUser);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
