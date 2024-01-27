"use client";

import { useEffect, useState } from "react";
import Message from "./message";
import verifyEmail from "@/firebase/auth/verifyemail";
import Link from "next/link";
import Loading from "./loading";

export default function VerifyEmailPage({ oobCode }) {
  const [loading, setLoading] = useState(true);
  let once = false;
  const [state, setStatae] = useState({ state: false, msg: "" });
  const vEmail = async () => {
    const { result, error } = await verifyEmail(oobCode);
    setLoading(false);
    if (error) {
      if (String(error.message).includes("auth/invalid-action-code")) {
        setStatae({ state: false, msg: "Invalid Link Or Expaired" });
      } else {
        setStatae({ state: false, msg: "Unkown Error..." });
      }
    } else {
      setStatae({ state: true, msg: "Email Verified Successfully..." });
    }
  };
  useEffect(() => {
    if (!once) {
      vEmail();
      console.log("ffff");
      once = true;
    }
  }, []);
  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center rounded-3xl shadow-5xl sm:w-2/3 w-full mx-auto my-10 py-10">
      <h1>Email Verifyction</h1>
      {loading && <Loading />}
      <Message msg={state.msg} err={!state.state} />
      {state.state && (
        <h1>
          Go To{" "}
          <Link href="/auth/signin" className="text-blue-500">
            LogIn
          </Link>{" "}
          Page
        </h1>
      )}
    </div>
  );
}
