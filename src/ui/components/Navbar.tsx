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
        <nav className={navbarStyles.nav}>
          {/* 좌측 로고 */}
          <Link href="/" className={navbarStyles.logo}>
            Matchuri
          </Link>

          {/* RIGHT - AUTH AREA */}
          <div className={navbarStyles.rightGroup}>
            {/* 게스트 */}
            {!isAuth && (
              <Link
                href="/login"
                className={`${authButtonStyles.base} ${authButtonStyles.login}`}
              >
                Login
              </Link>
            )}

            {/* 로그인 성공 */}
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
                        <button
                            onClick={() => {
                                console.log("로그아웃 버튼 클릭");
                            }}
                            className={navbarStyles.dropdownItem}
                        >
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