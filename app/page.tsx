"use client";

import { useAuthUser } from "@/contexts/auth-user-context";
import { ScreenSizeContextProvider } from "@/contexts/screen-size-context";
import dynamic from "next/dynamic";

const GameContainer = dynamic(() => import("./_components/game-container"), { ssr: false });

export default function Page() {
  const authUser = useAuthUser();

  return authUser ? (
    <ScreenSizeContextProvider>
      <GameContainer />
    </ScreenSizeContextProvider>
  ) : (
    <div className="h-svh flex justify-center items-center">
      <span>Loading</span>
    </div>
  );
}
