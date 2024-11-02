"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

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
  {
    label: "API Tokens",
    href: "/tokens",
  },
  {
    label: "Testing",
    href: "/testing",
  },
];

export default function NavMenu() {
  const path = usePathname();

  return (
    <menu className="flex items-center space-x-12">
      {menuItems.map((item) => (
        <Link href={item.href} key={item.label}>
          <li data-nav-active={path === item.href}>
            <Button variant={path === item.href ? "default" : "ghost"}>
              {item.label}
            </Button>
          </li>
        </Link>
      ))}
    </menu>
  );
}
