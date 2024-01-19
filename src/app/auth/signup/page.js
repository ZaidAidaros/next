"use client";
import React from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import BtnLoading from "@/app/components/btnloading";
import Message from "@/app/components/message";
import Link from "next/link";
import { FirebaseError } from "firebase/app";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [err, setErr] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { user } = useAuthContext();

  React.useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { result, error } = await signUp(email, password);
    setLoading(false);
    if (error) {
      if (String(error).includes("auth/email-already-in-use")) {
        setErr("Wrong Email Or Password Or Both.");
      } else {
        setErr("There is a problem..");
      }

      return;
    }

    // router.push("/");
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
          </div>
          {err && <Message msg={err} err={err} />}
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

export default Page;
