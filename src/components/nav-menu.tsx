"use client";
import useUserRole from "@/hooks/use-user-role";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

type MenuItem = {
  label: string;
  href: string;
  admin?: boolean;
};

const menuItems: MenuItem[] = [
  {
    label: "Reports",
    href: "/user-reports",
  },
  {
    label: "Alerts",
    href: "/admin/alerts",
    admin: true,
  },
  {
    label: "Map",
    href: "/admin/map",
    admin: true,
  },
  {
    label: "Logs",
    href: "/admin/logs",
    admin: true,
  },
  {
    label: "API Tokens",
    href: "/admin/tokens",
    admin: true,
  },
  {
    label: "Testing",
    href: "/admin/testing",
    admin: true,
  },
];

export default function NavMenu() {
  const path = usePathname();
  const { isLoaded, isSignedIn, isAdmin } = useUserRole();
  return (
    <menu className="flex items-center space-x-12">
      {menuItems.map((item) => {
        if (item.admin && !isAdmin) return null;
        return (
          <Link href={item.href} key={item.label}>
            <li data-nav-active={path === item.href}>
              <Button variant={path === item.href ? "default" : "ghost"}>
                {item.label}
              </Button>
            </li>
          </Link>
        );
      })}
    </menu>
  );
}
