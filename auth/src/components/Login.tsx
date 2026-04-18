import { useState } from "react";

export default function Login() {
  const [signedIn, setSignedIn] = useState(false);

  console.log(signedIn);

  const signIn = () => {
    setSignedIn(true);
  };

  return (
    <button
      className="border-2 border-white hover:cursor-pointer px-8 py-2 rounded-full hover:bg-white hover:text-black"
      onClick={signIn}
    >
      Login
    </button>
  );
}
