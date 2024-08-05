"use client";

import { User } from "@/prisma/generated/client";
import liff from "@line/liff";
import { signIn as nextAuthSignIn } from "next-auth/react";
import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react";
import { getLineLiffId } from "./_actions/get-line-liff-id";
import { getLineOfficialAccountFriendshipStatus } from "./_actions/get-line-official-account-friendship-status";
import { getUser } from "./_actions/get-user";

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

  const signIn = useMemo(() => {
    return async ({
      userId,
      displayName,
    }: {
      userId: string;
      displayName: string;
    }): Promise<User> => {
      let safeLoopCount = 5;

      while (safeLoopCount-- > 0) {
        const user = await getUser();

        if (user) {
          return user;
        }

        const signInResponse = await nextAuthSignIn("credentials", {
          redirect: false,
          vendor: "line",
          userId,
          displayName,
        });

        if (signInResponse?.error) {
          throw new Error(signInResponse.error);
        }
      }

      throw new Error("authorization failed");
    };
  }, []);

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
    
          const authUser = await signIn({
            userId,
            displayName,
          });

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
  }, [signIn]);

  return (
    <AuthUserContext.Provider value={authUser}>
      {children}
    </AuthUserContext.Provider>
  )
}
