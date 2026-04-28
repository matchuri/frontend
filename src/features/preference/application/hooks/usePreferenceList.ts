"use client";

import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

import { preferenceAtom } from "@/features/preference/application/atoms/preferenceAtom";
import { preferenceApi } from "@/features/preference/infrastructure/api/preferenceApi";
import { HttpError } from "@/infrastructure/http/httpClient";

// 기존 취향 조회
export function usePreferenceList() {
    const [preferenceState, setPreferenceState] = useAtom(preferenceAtom);
    const router = useRouter();

    const fetchPreference = useCallback(async () => {
        setPreferenceState({ status: "LOADING" });

        try {
            const data = await preferenceApi.fetchMyPreference();
            console.log("취향 정보: ", data);
            setPreferenceState({ status: "SUCCESS", data });

        } catch (error) {
            if (error instanceof HttpError) {
                // 401 → 로그인
                if (error.status === 401) {
                    alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
                    router.replace("/login");
                    return;
                }

                // 403 → 온보딩
                if (error.status === 403) {
                    router.replace("/terms");
                    return;
                }
            }

            setPreferenceState({
                status: "ERROR",
                message: "취향 정보를 불러오는데 실패했습니다.",
            });
        }
    }, [setPreferenceState, router]);

    useEffect(() => {
        fetchPreference();
    }, [fetchPreference]);

    return {
        preferenceState,
        refetchPreference: fetchPreference,
    };
}