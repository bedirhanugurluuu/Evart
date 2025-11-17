import type { ReactNode } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // Root layout sadece children render eder, gerçek layout [locale] içinde
  // Middleware zaten locale redirect yapıyor
  return <>{children}</>;
}

