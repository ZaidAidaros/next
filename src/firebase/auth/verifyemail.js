import auth from "./fireauth";
import { applyActionCode } from "firebase/auth";

export default async function verifyEmail(oobCode) {
  let result = null,
    error = null;
  try {
    result = await applyActionCode(auth, oobCode);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
