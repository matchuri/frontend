"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  Users,
  UtensilsCrossed,
  MapPin,
  Settings,
} from "lucide-react";

import {
  sidebarStyles,
  sidebarMenuItemStyles,
} from "@/ui/styles/sidebarStyles";

const MENUS = [
  { href: "/home", label: "홈", icon: Home },
  { href: "/recommend/personal", label: "개인 메뉴 추천", icon: User },
  { href: "/recommend/group", label: "그룹 메뉴 추천", icon: Users },
  { href: "/preference", label: "취향 관리", icon: UtensilsCrossed },
  { href: "/location", label: "위치 설정", icon: MapPin },
  { href: "/settings", label: "설정", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={sidebarStyles.container}>
      <div className={sidebarStyles.brandSection}>
        <Link href="/home" className={sidebarStyles.brandLink}>
          <UtensilsCrossed className={sidebarStyles.brandIcon} />
          <span className={sidebarStyles.brandText}>Matchuri</span>
        </Link>
      </div>

      <nav className={sidebarStyles.nav}>
        {MENUS.map((menu) => {
          const active = pathname === menu.href;
          const Icon = menu.icon;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={
                active
                  ? `${sidebarMenuItemStyles.base} ${sidebarMenuItemStyles.active}`
                  : `${sidebarMenuItemStyles.base} ${sidebarMenuItemStyles.inactive}`
              }
            >
              <Icon className={sidebarMenuItemStyles.icon} />
              <span>{menu.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}