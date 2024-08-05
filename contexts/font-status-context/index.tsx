"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type fontStatusContext = {
  isLoaded: boolean;
};

export const FontStatusContext = createContext<fontStatusContext | null>(null);

export function useFontStatus(): (fontStatusContext | null) {
  return useContext(FontStatusContext);
}

export function FontStatusContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [fontStatus, setFontStatus] = useState<fontStatusContext | null>(null);

  useEffect(() => {
    (async () => {
      const fontFace = new FontFace("DotGothic16", "url(/fonts/DotGothic16-Regular.woff2)");

      await fontFace.load();

      document.fonts.add(fontFace);

      setFontStatus({
        isLoaded: true,
      });
    })();
  }, []);

  return (
    <FontStatusContext.Provider value={fontStatus}>
      {children}
    </FontStatusContext.Provider>
  );
}
