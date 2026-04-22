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
  const [open, setOpen] = useState(false);
  const isAuth = auth.status === "AUTHENTICATED";

  return (
    <nav
      className={`${navbarStyles.nav} ${
        isAuth ? "left-[280px]" : "left-0"
      }`}
    >
      {!isAuth && (
        <Link href="/" className={navbarStyles.logo}>
          Matchuri
        </Link>
      )}

      <div className={isAuth ? navbarStyles.authRightOnly : navbarStyles.rightGroup}>
        {!isAuth && (
          <Link
            href="/login"
            className={`${authButtonStyles.base} ${authButtonStyles.login}`}
          >
            로그인
          </Link>
        )}

        {isAuth && (
          <div className="relative">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className={`${authButtonStyles.base} ${authButtonStyles.profile}`}
            >
              Profile
            </button>

            {open && (
              <div className={navbarStyles.dropdown}>
                <button className={navbarStyles.dropdownItem}>
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