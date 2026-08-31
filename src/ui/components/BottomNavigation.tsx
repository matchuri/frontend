"use client";

import Link from "next/link";
import { House, Utensils, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";

import { bottomNavigationStyles } from "@/ui/styles/bottomNavigationStyles";

interface BottomNavigationItem {
    readonly href: string;
    readonly label: string;
    readonly icon: typeof House;
    readonly isActive: (pathname: string) => boolean;
}

const navigationItems: readonly BottomNavigationItem[] = [
    {
        href: "/home",
        label: "홈",
        icon: House,
        isActive: (pathname) => pathname === "/home",
    },
    {
        href: "/group",
        label: "그룹",
        icon: Utensils,
        isActive: (pathname) =>
            pathname === "/group" ||
            pathname.startsWith("/group/"),
    },
    {
        href: "/settings",
        label: "설정",
        icon: UserRound,
        isActive: (pathname) =>
            pathname === "/settings" ||
            pathname.startsWith("/settings/"),
    },
];

export default function BottomNavigation() {
    const pathname = usePathname();

    return (
        <nav
            className={bottomNavigationStyles.navigation}
            aria-label="주요 메뉴"
        >
            {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.isActive(pathname);

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        aria-label={item.label}
                        aria-current={isActive ? "page" : undefined}
                        className={
                            isActive
                                ? bottomNavigationStyles.activeItem
                                : bottomNavigationStyles.item
                        }
                    >
                        <Icon
                            size={28}
                            strokeWidth={isActive ? 2.5 : 2}
                            aria-hidden="true"
                        />
                    </Link>
                );
            })}
        </nav>
    );
}