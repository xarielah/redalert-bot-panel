import Logo from "@/components/il.png";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import NavMenu from "./nav-menu";

export default function NavigationBar() {
  return (
    <nav className="p-4 bg-gray-50 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <Link href="/">
          <Image src={Logo.src} width={50} height={50} alt="logo" />
        </Link>
        <SignedIn>
          <NavMenu />
        </SignedIn>
      </div>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton showName />
        </SignedIn>
      </div>
    </nav>
  );
}
