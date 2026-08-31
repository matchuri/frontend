"use client";

import { Provider, useAtomValue } from "jotai";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { jotaiStore } from "@/shared/lib/jotaiStore";

import AuthInitializer from "@/features/auth/ui/components/AuthInitializer";

import {
    isAuthenticatedAtom,
    isAuthLoadingAtom,
    isOnboardingReadyAtom,
} from "@/features/auth/application/selectors/authSelectors";

import Navbar from "@/ui/components/Navbar";
import BottomNavigation from "@/ui/components/BottomNavigation";

import { appLayoutStyles } from "@/ui/styles/appLayoutStyles";

const navbarHiddenPaths = [
    "/login",
    "/signup",
    "/terms",
    "/signup/nickname",
    "/auth/find-id",
    "/auth/find-password",
];

function shouldShowPublicNavbar(pathname: string) {
    return !navbarHiddenPaths.includes(pathname);
}

function shouldHideBottomNavigation(pathname: string) {
    // 개인 메뉴 추천 진행/결과 화면
    if (pathname.startsWith("/personal-recommendation")) {
        return true;
    }

    // 맛집 결과 화면
    if (pathname.startsWith("/recommendation-restaurants")) {
        return true;
    }

    // 그룹 추천 준비/투표/결과 화면
    if (/^\/group\/\d+\/recommendations\/\d+/.test(pathname)) {
        return true;
    }

    return false;
}

function AppContent({
    children,
}: {
    children: ReactNode;
}) {
    const pathname = usePathname();

    const isAuthenticated =
        useAtomValue(isAuthenticatedAtom);

    const isAuthLoading =
        useAtomValue(isAuthLoadingAtom);

    const isOnboardingReady =
        useAtomValue(isOnboardingReadyAtom);

    const isMemberReady =
        !isAuthLoading &&
        isAuthenticated &&
        isOnboardingReady;

    const showNavbar =
        !isMemberReady &&
        shouldShowPublicNavbar(pathname);

    const showBottomNavigation =
        isMemberReady &&
        !shouldHideBottomNavigation(pathname);

    if (isAuthLoading) {
        return null;
    }

    return (
        <div className={appLayoutStyles.pageBackground}>
            <div className={appLayoutStyles.appContainer}>
                {showNavbar && <Navbar />}

                <main
                    className={
                        showBottomNavigation
                            ? appLayoutStyles.contentWithBottomNavigation
                            : appLayoutStyles.content
                    }
                >
                    {children}
                </main>

                {showBottomNavigation && (
                    <BottomNavigation />
                )}
            </div>
        </div>
    );
}

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Provider store={jotaiStore}>
            <AuthInitializer />
            <AppContent>
                {children}
            </AppContent>
        </Provider>
    );
}