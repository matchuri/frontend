"use client";

import { useEffect, useRef } from "react";
import { startTimer } from "@/features/emailVerification/application/utils/timer";

interface UseVerificationExpireTimerParams {
    remainingSeconds: number | null;
    setRemainingSeconds: React.Dispatch<React.SetStateAction<number | null>>;
    onExpired: () => void;
}

export function useVerificationExpireTimer({
    remainingSeconds,
    setRemainingSeconds,
    onExpired,
}: UseVerificationExpireTimerParams) {
    const timerRef = useRef<(() => void) | null>(null);

    const stopVerificationTimer = () => {
        if (timerRef.current) {
            timerRef.current();
            timerRef.current = null;
        }
    };

    useEffect(() => {
        if (remainingSeconds === null) return;
        if (remainingSeconds <= 0) return;

        stopVerificationTimer();

        timerRef.current = startTimer(() => {
            setRemainingSeconds((prev) => {
                if (prev === null) return null;

                if (prev <= 1) {
                    stopVerificationTimer();
                    onExpired();
                    return 0;
                }

                return prev - 1;
            });
        });

        return stopVerificationTimer;
    }, [remainingSeconds, setRemainingSeconds, onExpired]);

    return {
        stopVerificationTimer,
    };
}