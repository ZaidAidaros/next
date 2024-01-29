"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BtnLoading from "@/app/components/btnloading";
import Message from "@/app/components/message";
import sendResetPasswordEmailLink from "@/firebase/auth/resetpasswordreq";
import emailPasswordValidate from "@/tools/emailPasswordValidate";
import Link from "next/link";

export default function ForgetPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({ state: false, msg: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const ema = useSearchParams().get("email");

  useEffect(() => {
    if (ema) {
      setEmail(ema);
    }
  }, []);
  const handleForm = async (event) => {
    event.preventDefault();
    const { valid, errors } = emailPasswordValidate(email, null);
    setErrors(errors);
    if (!errors.email) {
      setLoading(true);
      setState({});
      const { result, error } = await sendResetPasswordEmailLink(email);
      setLoading(false);
      if (error) {
        setState({ state: false, msg: "Unknown Error" });
      } else {
        setState({ state: true, msg: "We Sent You Reset Email Link." });
      }
    }
  };

  return (
    <main className="bg-gray-500 flex flex-col min-h-screen items-center justify-center w-full py-8">
      <div className="bg-gray-100 flex flex-col items-center justify-center rounded-3xl shadow-5xl sm:w-2/3 w-full mx-auto py-10">
        <div>
          <h1 className="text-green-500 my-2">Forget Password</h1>
        </div>
        <form
          onSubmit={handleForm}
          className="form items-center rounded-xl w-1/2 border-2 border-green-500 h-full my-10 mx-auto p-2">
          <div>
            <label htmlFor="email">
              <p>Email</p>

              <input
                className="bg-white rounded-xl w-full border-2 border-gray-500 px-4 py-2 my-2 mx-auto"
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                name="email"
                id="email"
                placeholder="example@mail.com"
              />
            </label>
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <Message msg={state.msg} err={!state.state} />

          <div>
            <button
              type="submit"
              disabled={loading}
              className="bg-white border-2 border-green-500 mx-auto my-2 pt-2 pb-2 w-full rounded-2xl hover:border-gray-500 hover:bg-green-500 hover:text-white">
              <div className="flex  items-center justify-around">
                <h1>Send Email Link</h1>
                {loading && <BtnLoading />}
              </div>
            </button>
          </div>
        </form>
        <div className="flex items-center justify-between w-1/2 text-blue-500 my-4 px-4">
          <Link href="/auth/signup">Sign Up</Link>
          <Link href="/auth/signin">Sign In</Link>
        </div>
      </div>
    </main>
  );
}
