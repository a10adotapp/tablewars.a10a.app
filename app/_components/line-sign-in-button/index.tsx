"use client";

import liff from "@line/liff";
import Image from "next/image";
import { useCallback } from "react";

export function LineSignInButton() {
  const click = useCallback(async () => {
    liff.login();
  }, []);

  return (
    <button onClick={click}>
      <Image src="/buttons/line-sign-in-button.png" alt="Log in" width="128" height="37" />
    </button>
  );
}
