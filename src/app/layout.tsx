import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import Header from "@/components/shared/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Doctor Appointment",
  description: "Your trusted solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
        {/* {children} */}
      </body>
    </html>
  );
}
