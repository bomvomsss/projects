import type { Metadata } from "next";
import Nav from "@/components/Nav";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "The Museum for Fandom",
  description: "The Museum for Fandom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        <header>
          <h1>MFF</h1>
          <button>만들기</button>
          <button>알림</button>
        </header>
        {children}
        <footer>
          <Nav />
        </footer>
      </body>
    </html>
  );
}