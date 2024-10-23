import { ClerkProvider } from "@clerk/nextjs";
import { PT_Serif as Font } from "next/font/google";
import NavigationBar from "./(components)/navigation-bar";
import "./globals.css";

const font = Font({ weight: ["400"], subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${font.className}`}>
          <header>
            <NavigationBar />
          </header>
          <main className="max-w-7xl py-12 mx-auto px-4">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
