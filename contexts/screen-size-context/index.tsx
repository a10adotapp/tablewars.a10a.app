"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type ScreenSize = {
  width: number;
  height: number;
};

export const ScreenSizeContext = createContext<ScreenSize | null>(null);

export function useScreenSize(): (ScreenSize | null) {
  return useContext(ScreenSizeContext);
}

export function ScreenSizeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [screenSize, setScreenSize] = useState<ScreenSize | null>(null);

  useEffect(() => {
    const onResize = (() => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });

    window.addEventListener("resize", onResize);

    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <ScreenSizeContext.Provider value={screenSize}>
      {children}
    </ScreenSizeContext.Provider>
  )
}
