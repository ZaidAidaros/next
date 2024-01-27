import auth from "./fireauth";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";

export default async function setNewPassword(newPassword, oobCode) {
  let result = null,
    email,
    error = null;
  try {
    email = await verifyPasswordResetCode(auth, oobCode);
    result = await confirmPasswordReset(auth, oobCode, newPassword);
  } catch (err) {
    error = err;
  }
  return { result, email, error };
}
