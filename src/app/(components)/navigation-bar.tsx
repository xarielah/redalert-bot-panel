import Logo from "@/app/(components)/il.png";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
type MenuItem = {
  label: string;
  href: string;
};

const menuItems: MenuItem[] = [
  {
    label: "Alerts",
    href: "/alerts",
  },
  {
    label: "Map",
    href: "/map",
  },
  {
    label: "Logs",
    href: "/logs",
  },
];

export default function NavigationBar() {
  return (
    <nav className="p-4 bg-gray-50 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <Link href="/">
          <Image src={Logo.src} width={50} height={50} alt="logo" />
        </Link>
        <SignedIn>
          <menu className="flex items-center space-x-12">
            {menuItems.map((item) => (
              <Link href={item.href} key={item.label}>
                <li>{item.label}</li>
              </Link>
            ))}
          </menu>
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
