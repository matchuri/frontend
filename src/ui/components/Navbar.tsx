"use client";

import Link from "next/link";
import { useState } from "react";
import { useAtomValue } from "jotai";
import { UserRound, LogOut } from "lucide-react";
import {
  isAuthenticatedAtom,
  isAuthLoadingAtom,
  isOnboardingReadyAtom,
} from "@/features/auth/application/selectors/authSelectors";
import { useLogout } from "@/features/auth/application/hooks/useLogout";

import {
  navbarStyles,
  authButtonStyles,
} from "@/ui/styles/navbarStyles";

export default function Navbar() {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const isAuthLoading = useAtomValue(isAuthLoadingAtom);
  const isOnboardingReady = useAtomValue(isOnboardingReadyAtom);

  const [open, setOpen] = useState(false);
  const { isSubmitting, handleLogout } = useLogout();

  const showAuthenticatedUI =
    !isAuthLoading && isAuthenticated && isOnboardingReady;

  const onClickLogout = async () => {
    setOpen(false);
    await handleLogout();
  };

  return (
    <nav
      className={`${navbarStyles.nav} ${
        showAuthenticatedUI ? "left-[280px]" : "left-0"
      }`}
    >
      {!showAuthenticatedUI && (
        <Link href="/" className={navbarStyles.logo}>
          Matchuri
        </Link>
      )}

      <div
        className={
          showAuthenticatedUI
            ? navbarStyles.authRightOnly
            : navbarStyles.rightGroup
        }
      >
        {!isAuthLoading && !isAuthenticated && (
          <Link
            href="/login"
            className={`${authButtonStyles.base} ${authButtonStyles.login}`}
          >
            로그인
          </Link>
        )}

        {showAuthenticatedUI && (
          <div className={navbarStyles.profileWrapper}>
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className={`${authButtonStyles.base} ${authButtonStyles.profile}`}
              aria-label="프로필 메뉴 열기"
            >
              <UserRound className="h-8 w-8 text-slate-500" />
            </button>

            {open && (
              <div className={navbarStyles.dropdown}>
                <button
                  type="button"
                  onClick={onClickLogout}
                  disabled={isSubmitting}
                  className={navbarStyles.dropdownItem}
                >
                  <LogOut className="h-4 w-4 text-slate-400" />
                  <span>{isSubmitting ? "로그아웃 중..." : "로그아웃"}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}