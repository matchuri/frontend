"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAtomValue } from "jotai";
import { Home, User, Users, UtensilsCrossed, Settings, } from "lucide-react";

import {
    sidebarStyles,
    sidebarMenuItemStyles,
} from "@/ui/styles/sidebarStyles";

import { isPersonalRecommendationLoadingAtom } from "@/features/personalRecommendation/application/selectors/personalRecommendationSelectors";

const MENUS = [
    { href: "/home", label: "홈", icon: Home, enabled: true },
    { href: "/personal-recommendation", label: "개인 메뉴 추천", icon: User, enabled: true },
    { href: "/group", label: "그룹 메뉴 추천", icon: Users, enabled: true },
    { href: "/preference", label: "취향 관리", icon: UtensilsCrossed, enabled: true },
    { href: "/settings", label: "설정", icon: Settings, enabled: true },
];

export default function Sidebar() {
    const pathname = usePathname();

    const isGroupRecommendationPage =
        pathname.startsWith("/group/") &&
        pathname.includes("/recommendations/") &&
        !pathname.endsWith("/result");

    const isRecommendationLoading = useAtomValue(
        isPersonalRecommendationLoadingAtom,
    );

    const handleNotReady = () => {
        alert("준비중인 기능입니다.");
    };

    const handleMenuClick = (
        event: React.MouseEvent<HTMLAnchorElement>,
        href: string,
    ) => {
        // 그룹 메뉴 추천 진행중에는 페이지 이동 차단
        if (isGroupRecommendationPage) {
            event.preventDefault();
            alert("그룹 메뉴 추천이 진행 중에는 다른 페이지로 이동할 수 없습니다.");
            return;
        }
        if (!isRecommendationLoading) return;

        if (href === "/personal-recommendation") {
            return;
        }

        event.preventDefault();
        alert("메뉴 추천을 위한 취향 분석이 진행중입니다.");
    };

    return (
        <aside className={sidebarStyles.container}>
            <div className={sidebarStyles.brandSection}>
                <Link
                    href="/home"
                    className={sidebarStyles.brandLink}
                    onClick={(event) => handleMenuClick(event, "/home")}
                >
                    <UtensilsCrossed className={sidebarStyles.brandIcon} />
                    <span className={sidebarStyles.brandText}>Matchuri</span>
                </Link>
            </div>

            <nav className={sidebarStyles.nav}>
                {MENUS.map((menu) => {
                    const active = pathname === menu.href;
                    const Icon = menu.icon;
                    const className = active
                        ? `${sidebarMenuItemStyles.base} ${sidebarMenuItemStyles.active}`
                        : `${sidebarMenuItemStyles.base} ${sidebarMenuItemStyles.inactive}`;

                    if (menu.enabled) {
                        return (
                            <Link
                                key={menu.href}
                                href={menu.href}
                                className={className}
                                onClick={(event) =>
                                    handleMenuClick(event, menu.href)
                                }
                            >
                                <Icon className={sidebarMenuItemStyles.icon} />
                                <span>{menu.label}</span>
                            </Link>
                        );
                    }

                    return (
                        <button
                            key={menu.href}
                            type="button"
                            onClick={
                                isRecommendationLoading
                                    ? () =>
                                          alert(
                                              "메뉴 추천을 위한 취향 분석이 진행중입니다.",
                                          )
                                    : handleNotReady
                            }
                            className={`${className} w-full text-left`}
                        >
                            <Icon className={sidebarMenuItemStyles.icon} />
                            <span>{menu.label}</span>
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}