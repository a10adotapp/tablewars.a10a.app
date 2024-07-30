import { authOptions } from "@/lib/auth/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    if (authOptions.pages?.signIn) {
      return redirect(authOptions.pages?.signIn);
    }

    return (
      <h1>Unauthorized</h1>
    );
  }

  return children;
}
