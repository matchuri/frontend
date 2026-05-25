"use client";

import { useEffect, useState } from "react";
import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";
import { locationSettingStorage } from "@/features/locationSetting/infrastructure/storage/locationSettingStorage";

export function useLocationSetting(storageKey: string) {
    const [location, setLocation] = useState<LocationSetting | null>(null);

    useEffect(() => {
        setLocation(locationSettingStorage.get(storageKey));
    }, [storageKey]);

    const saveLocation = (nextLocation: LocationSetting) => {
        locationSettingStorage.set(storageKey, nextLocation);
        setLocation(nextLocation);
    };

    return {
        location,
        saveLocation,
    };
}