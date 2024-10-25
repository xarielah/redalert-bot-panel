"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function NavMenu() {
  const path = usePathname();

  return (
    <menu className="flex items-center space-x-12">
      {menuItems.map((item) => (
        <Link href={item.href} key={item.label}>
          <li data-nav-active={path === item.href}>{item.label}</li>
        </Link>
      ))}
    </menu>
  );
}
