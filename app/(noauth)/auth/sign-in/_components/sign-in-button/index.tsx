"use client";

import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";

export function SignInButton({
  onSignedIn,
}: {
  onSignedIn?: () => void;
}) {
  const [isBusy, setIsBusy] = useState(false);

  const click = useCallback(async () => {
    try {
      setIsBusy(true);

      await signIn("credentials");

      onSignedIn?.();
    } catch (err) {
      alert(JSON.stringify(err, null, "  "));
    } finally {
      setIsBusy(false);
    }
  }, [onSignedIn]);

  return (
    <button
      disabled={isBusy}
      onClick={click}
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
      Sign In
    </button>
  )
}
