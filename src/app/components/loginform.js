"use client";
import { useState, useEffect } from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import BtnLoading from "@/app/components/btnloading";
import Link from "next/link";
import Message from "@/app/components/message";
import logOut from "@/firebase/auth/logout";
import sendResetPasswordEmailLink from "@/firebase/auth/resetpasswordreq";
import sendEmailVerifyLink from "@/firebase/auth/sendEmailVerifyLink";
import emailPasswordValidate from "@/tools/emailPasswordValidate";

export default function LogInForm() {
  const router = useRouter();
  const { user } = useAuthContext();
  const ema = useSearchParams().get("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const [fLoading, setFLoading] = useState(false);
  const [state, setState] = useState({ state: false, msg: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  useEffect(() => {
    if (user !== null) {
      router.push("/");
    }
    if (ema) {
      setEmail(ema);
    }
  }, []);
  const sendResetReq = async () => {
    // setState({});
    // if (email) {
    //   setFLoading(true);
    //   const { result, error } = await sendResetPasswordEmailLink(email);
    //   setFLoading(false);
    //   if (error) {
    //     setState({ state: false, msg: error.message });
    //   } else {
    //     setState({ state: true, msg: "We Sent You Reset Email Link." });
    //   }
    // } else {
    //   setState({ state: false, msg: "enter your email." });
    // }
  };
  const handleForm = async (event) => {
    event.preventDefault();
    const { valid, errors } = emailPasswordValidate(email, password);
    setErrors(errors);
    if (valid) {
      setLoading(true);
      setState({});
      const { result, error } = await signIn(email, password);
      setLoading(false);
      if (error) {
        if (
          String(error.message).includes("auth/invalid-credential") ||
          String(error.message).includes("auth/user-not-found")
        ) {
          setState({ state: false, msg: "Wrong Email Or Password Or Both." });
        } else {
          setState({ state: false, msg: "There is a problem.." });
        }
        return;
      }
      if (!result.user.emailVerified) {
        const { result, error } = await sendEmailVerifyLink();
        await logOut();
        if (error) {
          setState({ state: false, msg: "There is a problem.." });
          return;
        }
        setState({
          state: false,
          msg: "you can not login untill you verifiy email we send verifyction email",
        });

        return;
      }
      // else successful
      router.push("/");
    }
  };
  return (
    <main className="bg-gray-500 flex flex-col min-h-screen items-center justify-center w-full py-8">
      <div className="bg-gray-100 flex flex-col items-center justify-center rounded-3xl shadow-5xl sm:w-2/3 w-full mx-auto py-10">
        <div>
          <h1 className="text-green-500 my-2">Sign In</h1>
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
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
          <div className="flex flex-col justify-around mb-2">
            <Message msg={state.msg} err={!state.state} />
            <div className="flex justify-end text-blue-500">
              <Link href={"/auth/forgetpassword?email='" + email + "'"}>
                forget password
              </Link>
            </div>
            {/* <button disabled={fLoading} onClick={sendResetReq}>
              <div className="flex justify-end text-blue-500">
                Forget Password
                {fLoading && <BtnLoading />}
              </div>
            </button> */}
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="bg-white border-2 border-green-500 mx-auto my-2 pt-2 pb-2 w-full rounded-2xl hover:border-gray-500 hover:bg-green-500 hover:text-white">
              <div className="flex  items-center justify-around">
                <h1>Sign In</h1>
                {loading && <BtnLoading />}
              </div>
            </button>
          </div>
        </form>
        <div>
          <Link href="/auth/signup" className="text-blue-500 my-4">
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}
