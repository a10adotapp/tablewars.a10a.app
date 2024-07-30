"use client";

import { useCallback } from "react";
import { SignInButton } from "./_components/sign-in-button";

export default function Page() {
  const signedIn = useCallback(async () => {
    location.href = "/";
  }, []);

  return (
    <div className="p-4">
      <SignInButton
        onSignedIn={signedIn} />
    </div>
  );
}
