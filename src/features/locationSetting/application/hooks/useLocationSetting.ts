"use client";

import { useCallback, useEffect, useState } from "react";
import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";
import { locationSettingApi } from "@/features/locationSetting/infrastructure/api/locationSettingApi";

export function useLocationSetting() {
    const [location, setLocation] =
        useState<LocationSetting | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [errorMessage, setErrorMessage] =
        useState<string | null>(null);

    const fetchLocation = useCallback(async () => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const savedLocation = await locationSettingApi.fetchMyLocation();

            setLocation(savedLocation);
        } catch (error) {
            setLocation(null);

            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "개인 위치 정보를 불러오지 못했습니다.",
            );
        } finally {
            setIsLoading(false);
        }
    }, []);

    const saveLocation = useCallback(
        async (
            nextLocation: LocationSetting,
        ): Promise<boolean> => {
            if (isSaving) {
                return false;
            }

            setIsSaving(true);
            setErrorMessage(null);

            try {
                const savedLocation =
                    await locationSettingApi.saveMyLocation(nextLocation);

                setLocation(savedLocation);

                return true;
            } catch (error) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "개인 위치 정보를 저장하지 못했습니다.";

                setErrorMessage(message);
                alert(message);

                return false;
            } finally {
                setIsSaving(false);
            }
        },
        [isSaving],
    );

    useEffect(() => {
        void fetchLocation();
    }, [fetchLocation]);

    return {
        location,
        isLoading,
        isSaving,
        errorMessage,
        saveLocation,
        refetchLocation: fetchLocation,
    };
}