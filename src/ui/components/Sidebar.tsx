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
  { href: "/home", label: "홈", icon: Home, enabled: true },
  { href: "/personal", label: "개인 메뉴 추천", icon: User },
  { href: "/group", label: "그룹 메뉴 추천", icon: Users },
  { href: "/preference", label: "취향 관리", icon: UtensilsCrossed },
  { href: "/location", label: "위치 설정", icon: MapPin },
  { href: "/settings", label: "설정", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  const handleNotReady = (e: React.MouseEvent) => {
    e.preventDefault(); // 라우팅 막기
    alert("준비중인 기능입니다.");
  };

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
          const isEnabled = menu.enabled;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              onClick={!isEnabled ? handleNotReady : undefined}
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