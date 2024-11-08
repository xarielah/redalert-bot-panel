import { ClerkProvider } from "@clerk/nextjs";
import { Lato as Font } from "next/font/google";
import { Toaster } from "sonner";
import NavigationBar from "../components/navigation-bar";
import "./globals.css";

const font = Font({ weight: ["400"], subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body className={`${font.className} min-h-screen`}>
          <header>
            <NavigationBar />
          </header>
          <main className="max-w-7xl py-12 mx-auto px-4">
            <Toaster expand visibleToasts={3} />
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
