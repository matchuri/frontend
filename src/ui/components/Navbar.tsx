"use client";

import Link from "next/link";
import { useState } from "react";
import { useAtomValue } from "jotai";
import { authAtom } from "@/features/auth/application/atom/authAtom";

import {
    navbarStyles,
    authButtonStyles,
} from "@/ui/styles/navbarStyles";

export default function Navbar() {
    const auth = useAtomValue(authAtom);

    const isAuthenticated = auth.status === "AUTHENTICATED";
    const isLoading = auth.status === "LOADING";

    return (
        <nav className={navbarStyles.nav}>
          {/* 좌측 로고 */}
          <Link href="/" className={navbarStyles.logo}>
            Matchuri
          </Link>

          {/* RIGHT - AUTH AREA */}
          <div className={navbarStyles.rightGroup}>
            {/* 로딩 */}
            {isLoading && null}

            {/* 게스트 */}
            {!isLoading && !isAuthenticated && (
              <Link
                href="/login"
                className={`${authButtonStyles.base} ${authButtonStyles.loginInactive}`}
              >
                Login
              </Link>
            )}

            {/* 로그인 성공 */}
            {!isLoading && isAuthenticated && (
              <div
                className={`${authButtonStyles.base} ${authButtonStyles.profile}`}
              >
                Profile
              </div>
            )}
          </div>
        </nav>
    );
}