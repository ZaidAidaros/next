"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BtnLoading from "@/app/components/btnloading";
import Message from "@/app/components/message";
import setNewPassword from "@/firebase/auth/setnewpassword";
import emailPasswordValidate from "@/tools/emailPasswordValidate";

export default function ResetPasswordForm({ oobCode }) {
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [state, setState] = useState({ state: false, msg: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const router = useRouter();
  const handleForm = async (event) => {
    event.preventDefault();
    const { valid, errors } = emailPasswordValidate(null, password);
    setErrors(errors);
    if (!errors.password) {
      if (password === password1) {
        setLoading(true);
        const { result, email, error } = await setNewPassword(
          password,
          oobCode
        );
        setLoading(false);
        if (error) {
          console.log(error);
          if (String(error.message).includes("auth/invalid-action-code")) {
            setState({ state: false, msg: "Invalid or Expaire Url" });
          } else {
            setState({ state: false, msg: "There is problem.." });
          }
        } else {
          setState({ state: true, msg: "Password Updated Successfully.." });
          setTimeout(() => {
            router.push("/auth/signin?email=" + email);
          }, 2000);
        }
      } else {
        setState({ state: false, msg: "password not match" });
      }
    }
  };
  return (
    <main className="bg-gray-500 min-h-screen flex flex-col items-center justify-center  py-8">
      <div className="bg-gray-100 flex flex-col items-center justify-center sm:w-2/3 w-full rounded-3xl shadow-5xl mx-auto py-10">
        <div>
          <h1 className="text-green-500 my-2">Set New Password</h1>
        </div>
        <form
          onSubmit={handleForm}
          className="form items-center rounded-xl w-1/2 border-2 border-green-500 h-full my-10 mx-auto px-4 py-2">
          <div>
            <label htmlFor="password">
              <p>Password</p>
              <input
                className="bg-white rounded-xl w-full border-2 border-gray-500 px-4 py-2 my-2 mx-auto"
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              <p>The Password again</p>
              <input
                className="bg-white rounded-xl w-full border-2 border-gray-500 px-4 py-2 my-2 mx-auto"
                onChange={(e) => setPassword1(e.target.value)}
                required
                type="password"
                name="password1"
                id="password1"
                placeholder="password"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </label>
          </div>

          <Message msg={state.msg} err={!state.state} />
          <button
            type="submit"
            onLoad={() => loading}
            className="bg-white border-2 border-green-500 mx-auto my-2 pt-2 pb-2 w-full rounded-2xl hover:border-gray-500 hover:bg-green-500 hover:text-white">
            <div className="flex items-center justify-around">
              <h1>Reset Password</h1>
              {loading && <BtnLoading />}
            </div>
          </button>
        </form>
      </div>
    </main>
  );
}
