import { ReactNode } from "react";
import { preload } from "react-dom";
import "./globals.css";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  preload("/fonts/DotGothic16-Regular.woff2", {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  });

  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
