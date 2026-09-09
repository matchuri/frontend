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

import BottomNavigation from "@/ui/components/BottomNavigation";

import { appLayoutStyles } from "@/ui/styles/appLayoutStyles";

function shouldHideBottomNavigation(pathname: string) {
    if (pathname.startsWith("/personal-recommendation")) {
        return true;
    }

    if (pathname.startsWith("/recommendation-restaurants")) {
        return true;
    }

    if (/^\/group\/\d+\/recommendations\/\d+/.test(pathname)) {
        return true;
    }

    return false;
}

function AppContent({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const isAuthLoading = useAtomValue(isAuthLoadingAtom);
    const isOnboardingReady = useAtomValue(isOnboardingReadyAtom);

    const isMemberReady =
        !isAuthLoading &&
        isAuthenticated &&
        isOnboardingReady;

    const showBottomNavigation =
        isMemberReady &&
        !shouldHideBottomNavigation(pathname);

    if (isAuthLoading) {
        return null;
    }

    return (
        <div className={appLayoutStyles.pageBackground}>
            <div className={appLayoutStyles.appContainer}>
                <main
                    className={
                        showBottomNavigation
                            ? appLayoutStyles.contentWithBottomNavigation
                            : appLayoutStyles.content
                    }
                >
                    {children}
                </main>

                {showBottomNavigation && <BottomNavigation />}
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