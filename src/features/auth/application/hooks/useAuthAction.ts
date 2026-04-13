"use client";

import { useSetAtom } from "jotai";
import { authAtom } from "@/features/auth/application/atom/authAtom";

export const useAuthAction = () => {
    const setAuth = useSetAtom(authAtom);

    const setLoading = () => {
        setAuth({ status: "LOADING" });
    };

    const setAuthenticated = (accessToken: string) => {
        setAuth({
            status: "AUTHENTICATED",
            accessToken,
        });
    };

    const clearAuth = () => {
        setAuth({ status: "UNAUTHENTICATED" });
    };

    return { setLoading, setAuthenticated, clearAuth };
};