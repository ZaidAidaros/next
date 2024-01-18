"use client";

import logOut from "@/firebase/auth/logout";

export default function SignOutBtn() {
  const hundelSignOut = async () => {
    const { result, error } = await logOut();
    if (error === null) {
      router.push("/");
    }
  };
  return (
    <button onClick={hundelSignOut} className="text-blue-400">
      Log Out
    </button>
  );
}
