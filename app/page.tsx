"use client";

import { useAuthUser } from "@/contexts/auth-user-context";
import { useFontStatus } from "@/contexts/font-status-context";
import { ScreenSizeContextProvider } from "@/contexts/screen-size-context";
import { ChevronsDown, Loader } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { LineSignInButton } from "./_components/line-sign-in-button";
import { ReloadButton } from "./_components/reload-button";

const GameContainer = dynamic(() => import("./_components/game-container"), { ssr: false });

export default function Page() {
  const fontStatus = useFontStatus();
  const authUser = useAuthUser();

  if (!fontStatus?.isLoaded) {
    return (
      <div className="h-svh flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div>フォント読み込み中...</div>

          <div>
            <Loader className="animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (!authUser.user) {
    if (authUser.isSignInRequired) {
      return (
        <div className="h-svh flex justify-center items-center">
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              Table Warsを開始するためには、<br />
              LINEアカウントでログインする必要があります。
            </div>
  
            <ChevronsDown />
  
            <LineSignInButton />
          </div>
        </div>
      );
    }

    return (
      <div className="h-svh flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div>認証情報読み込み中...</div>

          <div>
            <Loader className="animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (!authUser.isLineOfficialAccountAvailable) {
    return (
      <div className="h-svh flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            Table Warsを開始するためには、<br />
            LINE公式アカウントを友達登録している必要があります。
          </div>

          <ChevronsDown />

          <a href="https://lin.ee/1Sq8PBY" target="_blank">
            <Image src="/buttons/line-add-friend-button.png" alt="友だち追加" width="116" height="36" />
          </a>

          <ReloadButton />
        </div>
      </div>
    );
  }

  return (
    <ScreenSizeContextProvider>
      <GameContainer />
    </ScreenSizeContextProvider>
  );
}
