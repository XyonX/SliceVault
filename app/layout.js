import "./globals.css";
import { AppProvider } from "./AppProvider";
import Header from "@/components/Header";

export const metadata = {
  title: "Slice: The Future of Sharing",
  description:
    "Decentralized, secure, and seamless file sharing powered by peer-to-peer technology",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AppProvider>
        <body>
          <Header />
          {children}
        </body>
      </AppProvider>
    </html>
  );
}
