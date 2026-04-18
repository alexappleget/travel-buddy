import { useState } from "react";

export default function Logout() {
  const [signedOut, setSignedOut] = useState(false);

  const signOut = () => {
    setSignedOut(true);
  };

  return (
    <button
      className="border-2 border-white hover:cursor-pointer px-8 py-2 rounded-full hover:bg-white hover:text-black"
      onClick={signOut}
    >
      Logout
    </button>
  );
}
