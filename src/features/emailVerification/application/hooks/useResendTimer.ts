"use client";

import { useEffect, useRef } from "react";
import { startTimer } from "@/features/emailVerification/application/utils/timer";

interface UseResendTimerParams {
    resendSeconds: number | null;
    setResendSeconds: React.Dispatch<React.SetStateAction<number | null>>;
}

export function useResendTimer({
    resendSeconds,
    setResendSeconds,
}: UseResendTimerParams) {
    const timerRef = useRef<(() => void) | null>(null);

    const stopResendTimer = () => {
        if (timerRef.current) {
            timerRef.current();
            timerRef.current = null;
        }
    };

    useEffect(() => {
        if (resendSeconds === null) return;
        if (resendSeconds <= 0) return;

        stopResendTimer();

        timerRef.current = startTimer(() => {
            setResendSeconds((prev) => {
                if (prev === null) return null;

                if (prev <= 1) {
                    stopResendTimer();
                    return 0;
                }

                return prev - 1;
            });
        });

        return stopResendTimer;
    }, [resendSeconds, setResendSeconds]);

    return {
        stopResendTimer,
    };
}