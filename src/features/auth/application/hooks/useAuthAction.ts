import { useSetAtom } from "jotai";
import { useCallback } from "react";
import { authAtom } from "@/features/auth/application/atom/authAtom";

export function useAuthAction() {
    const setAuth = useSetAtom(authAtom);

    const setLoading = useCallback(() => {
        setAuth({ status: "LOADING" });
    }, [setAuth]);

    const setAuthenticated = useCallback((accessToken: string) => {
        setAuth({
        status: "AUTHENTICATED",
        accessToken,
        });
    }, [setAuth]);

    const clearAuth = useCallback(() => {
        setAuth({ status: "UNAUTHENTICATED" });
    }, [setAuth]);

    return { setLoading, setAuthenticated, clearAuth };
}