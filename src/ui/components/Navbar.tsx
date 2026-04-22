"use client";

import Link from "next/link";
import { useState } from "react";
import { useAtomValue } from "jotai";
import {
  isAuthenticatedAtom,
  isAuthLoadingAtom,
} from "@/features/auth/application/selectors/authSelectors";

import {
  navbarStyles,
  authButtonStyles,
} from "@/ui/styles/navbarStyles";

export default function Navbar() {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const isAuthLoading = useAtomValue(isAuthLoadingAtom);
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={`${navbarStyles.nav} ${
        !isAuthLoading && isAuthenticated ? "left-[280px]" : "left-0"
      }`}
    >
      {!isAuthLoading && !isAuthenticated && (
        <Link href="/" className={navbarStyles.logo}>
          Matchuri
        </Link>
      )}

      <div
        className={
          !isAuthLoading && isAuthenticated
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

        {!isAuthLoading && isAuthenticated && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className={`${authButtonStyles.base} ${authButtonStyles.profile}`}
            >
              Profile
            </button>

            {open && (
              <div className={navbarStyles.dropdown}>
                <button type="button" className={navbarStyles.dropdownItem}>
                  로그아웃
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}