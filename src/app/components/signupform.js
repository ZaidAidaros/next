"use client";
import { useState, useEffect } from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import BtnLoading from "@/app/components/btnloading";
import Message from "@/app/components/message";
import Link from "next/link";
import emailPasswordValidate from "@/tools/emailPasswordValidate";
import logOut from "@/firebase/auth/logout";
import sendEmailVerifyLink from "@/firebase/auth/sendEmailVerifyLink";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState({ state: false, msg: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, []);

  const handleForm = async (event) => {
    event.preventDefault();
    const { valid, errors } = emailPasswordValidate(email, password);
    setErrors(errors);
    if (valid) {
      setLoading(true);
      const { result, error } = await signUp(email, password);
      setLoading(false);
      if (error) {
        if (String(error.message).includes("auth/email-already-in-use")) {
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
          state: true,
          msg: "We send verifyction email, verify then log in",
        });

        return;
      }
      // else successful
      router.push("/");
    }
  };
  return (
    <main className="bg-gray-500 min-h-screen flex flex-col items-center justify-center  py-8">
      <div className="bg-gray-100 flex flex-col items-center justify-center sm:w-2/3 w-full rounded-3xl shadow-5xl mx-auto py-10">
        <div>
          <h1 className="text-green-500 my-2">Sign Up</h1>
        </div>
        <form
          onSubmit={handleForm}
          className="form items-center rounded-xl w-1/2 border-2 border-green-500 h-full my-10 mx-auto px-4 py-2">
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
          <Message msg={state.msg} err={!state.state} />
          <button
            type="submit"
            onLoad={() => loading}
            className="bg-white border-2 border-green-500 mx-auto my-2 pt-2 pb-2 w-full rounded-2xl hover:border-gray-500 hover:bg-green-500 hover:text-white">
            <div className="flex items-center justify-around">
              <h1>Sign Up</h1>
              {loading && <BtnLoading />}
            </div>
          </button>
        </form>
        <div>
          <Link href="/auth/signin" className="text-blue-500 my-4">
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}
