import auth from "./fireauth";
import { sendPasswordResetEmail } from "firebase/auth";

export default async function sendResetPasswordEmailLink(email) {
  let result = null,
    error = null;
  try {
    result = await sendPasswordResetEmail(auth, email, {
      url: "http://localhost:3000/auth/resetpassword",
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
