"use client";

import { User } from "@/prisma/generated/client";
import liff from "@line/liff";
import { signIn } from "next-auth/react";
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { getLineLiffId } from "./_actions/get-line-liff-id";
import { getLineOfficialAccountFriendshipStatus } from "./_actions/get-line-official-account-friendship-status";
import { getOrCreateUser } from "./_actions/get-or-create-user";

type authUserContext = {
  user?: User;
  isSignInRequired?: boolean;
  isLineOfficialAccountAvailable?: boolean;
}

export const AuthUserContext = createContext<authUserContext>({});

export function useAuthUser(): (authUserContext) {
  return useContext(AuthUserContext);
}

export function AuthUserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const hasRunRef = useRef(false);

  const [authUser, setAuthUser] = useState<authUserContext>({});

  useEffect(() => {
    try {
      if (!hasRunRef.current) {
        hasRunRef.current = true;

        (async () => {
          await liff.init({ liffId: await getLineLiffId() });

          if (!liff.isLoggedIn()) {
            setAuthUser({
              isSignInRequired: true,
            });

            return;
          }

          const {
            userId,
            displayName,
          } = await liff.getProfile();

          const authUser = await getOrCreateUser(userId, {
            name: displayName,
          });

          const signInResponse = await signIn("credentials", {
            redirect: false,
            vendor: "line",
            userId: authUser.id,
          });
      
          if (!signInResponse?.ok) {
            throw new Error(signInResponse?.error || "unauthorized");
          }

          const accessToken = liff.getAccessToken();

          if (!accessToken) {
            throw new Error("Failed to get access token");
          }

          const { friendFlag } = await getLineOfficialAccountFriendshipStatus(accessToken);

          setAuthUser({
            user: authUser,
            isSignInRequired: false,
            isLineOfficialAccountAvailable: friendFlag,
          });
        })();
      }
    } catch (err) {
      setAuthUser({});

      alert(JSON.stringify(err, null, "  "));
    }
  }, []);

  return (
    <AuthUserContext.Provider value={authUser}>
      {children}
    </AuthUserContext.Provider>
  )
}
