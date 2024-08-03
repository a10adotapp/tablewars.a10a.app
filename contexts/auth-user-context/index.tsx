"use client";

import { User } from "@/prisma/generated/client";
import liff from "@line/liff";
import { signIn } from "next-auth/react";
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { getLineLiffId } from "./_actions/get-line-liff-id";
import { getUser } from "./_actions/get-user";

export const AuthUserContext = createContext<User | null>(null);

export function useAuthUser(): (User | null) {
  return useContext(AuthUserContext);
}

export function AuthUserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const hasRunRef = useRef(false);

  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      if (!hasRunRef.current) {
        hasRunRef.current = true;

        (async () => {
          await liff.init({ liffId: await getLineLiffId() });

          const {
            userId,
            displayName,
          } = await liff.getProfile();

          let safeLoopCount = 5;

          while (safeLoopCount-- > 0) {
            const user = await getUser();

            if (user) {
              setAuthUser(user);

              return;
            }

            const signInResponse = await signIn("credentials", {
              redirect: false,
              vendor: "line",
              userId,
              displayName,
            });

            if (!signInResponse?.ok) {
              return alert(signInResponse?.error);
            }
          }
        })();
      }
    } catch (err) {
      alert(JSON.stringify(err, null, "  "));
    }
  }, []);

  return (
    <AuthUserContext.Provider value={authUser}>
      {children}
    </AuthUserContext.Provider>
  )
}
