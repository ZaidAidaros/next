"use client";
import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import BtnLoading from "@/app/components/btnloading";
import Link from "next/link";
import Message from "@/app/components/message";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const { user } = useAuthContext();
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(null);

  React.useEffect(() => {
    if (user !== null) {
      router.push("/");
    }
  }, [user]);

  const handleForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { result, error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      if (
        String(error).includes("auth/invalid-credential") ||
        String(error).includes("auth/user-not-found")
      ) {
        setErr("Wrong Email Or Password Or Both.");
      } else {
        setErr("There is a problem..");
      }
      return;
    }

    // else successful
    //router.push("/");
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
            disabled={loading}
            className="bg-white border-2 border-green-500 mx-auto my-2 pt-2 pb-2 w-full rounded-2xl hover:border-gray-500 hover:bg-green-500 hover:text-white">
            <div className="flex  items-center justify-around">
              <h1>Sign In</h1>
              {loading && <BtnLoading />}
            </div>
          </button>
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

export default Page;
