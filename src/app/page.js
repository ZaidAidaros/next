"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user } = useAuthContext();
  React.useEffect(() => {
    if (user == null) router.push("/");
  }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono  lg:flex">
        <h1>Home</h1>
        <div></div>
      </div>
    </main>
  );
}
