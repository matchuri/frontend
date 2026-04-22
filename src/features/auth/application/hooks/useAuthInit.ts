"use client";

import { useEffect } from "react";
import { useAuthAction } from "@/features/auth/application/hooks/useAuthAction";
import { getAccessToken } from "@/features/auth/infrastructure/token/authTokenProvider";
import { clientEnv } from "@/infrastructure/config/env";

export function useAuthInit() {
  const { setAuthenticated, setLoading, clearAuth } = useAuthAction();

  useEffect(() => {
    const init = async () => {
      const existingToken = getAccessToken();

      if (existingToken) {
        setAuthenticated(existingToken);
        return;
      }

      setLoading();

      try {
        const response = await fetch(
          `${clientEnv.apiBaseUrl}/api/v1/auth/refresh`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (!response.ok) {
          clearAuth();
          return;
        }

        const data = await response.json();
        const token = data.data?.accessToken;

        if (!token) {
          clearAuth();
          return;
        }

        setAuthenticated(token);
      } catch (error) {
        console.error("[네트워크 오류]", error);
        clearAuth();
      }
    };

    init();
  }, [setAuthenticated, setLoading, clearAuth]);
}