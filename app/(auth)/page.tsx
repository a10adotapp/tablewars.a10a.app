"use client";

import { ScreenSizeContextProvider } from "@/contexts/screen-size-context";
import dynamic from "next/dynamic";

const GameContainer = dynamic(() => import("./_components/game-container"), { ssr: false });

export default function Page() {
  return (
    <ScreenSizeContextProvider>
      <GameContainer />
    </ScreenSizeContextProvider>
  );
}
