import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./AppProvider";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Slice: The Future of Sharing",
  description:
    "Decentralized, secure, and seamless file sharing powered by peer-to-peer technology",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AppProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col items-center justify-center`}
        >
          <Header />
          {children}
        </body>
      </AppProvider>
    </html>
  );
}
