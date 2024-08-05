import { AuthUserContextProvider } from "@/contexts/auth-user-context";
import { FontStatusContextProvider } from "@/contexts/font-status-context";
import { ReactNode } from "react";
import "./globals.css";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // preload("/fonts/DotGothic16-Regular.woff2", {
  //   as: "font",
  //   type: "font/woff2",
  //   crossOrigin: "anonymous",
  // });

  return (
    <html>
      <body>
        <FontStatusContextProvider>
          <AuthUserContextProvider>
            {children}
          </AuthUserContextProvider>
        </FontStatusContextProvider>
      </body>
    </html>
  );
}
