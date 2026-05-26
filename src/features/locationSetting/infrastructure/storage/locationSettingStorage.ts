import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";

export const locationSettingStorage = {
    get(storageKey: string): LocationSetting | null {
        if (typeof window === "undefined") return null;

        const value = window.localStorage.getItem(storageKey);
        if (!value) return null;

        try {
            return JSON.parse(value) as LocationSetting;
        } catch {
            return null;
        }
    },

    set(storageKey: string, location: LocationSetting) {
        window.localStorage.setItem(storageKey, JSON.stringify(location));
    },
};