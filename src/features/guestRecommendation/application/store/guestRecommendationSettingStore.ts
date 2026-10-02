import { jotaiStore } from "@/shared/lib/jotaiStore";

import { guestRecommendationSettingAtom } from "@/features/guestRecommendation/application/atoms/guestRecommendationSettingAtom";

import type { PreferenceCategory } from "@/features/preference/domain/model/PreferenceCategory";
import type {
    DislikedFood,
    PreferenceOption,
} from "@/features/preference/domain/model/UserPreference";

import type { LocationRadiusMeters } from "@/features/locationSetting/domain/config/locationRadiusPolicy";

interface GuestLocationCenter {
    readonly latitude: number;
    readonly longitude: number;
    readonly level: number;
}

export function toggleGuestPreference(
    category: PreferenceCategory,
    option: PreferenceOption,
) {
    jotaiStore.set(guestRecommendationSettingAtom, (prev) => {
        const selectedValues = prev.preference.selections[category];

        const isSelected = selectedValues.some(
            (selectedValue) => selectedValue.code === option.code,
        );

        return {
            ...prev,
            preference: {
                ...prev.preference,
                selections: {
                    ...prev.preference.selections,
                    [category]: isSelected
                        ? selectedValues.filter(
                              (selectedValue) => selectedValue.code !== option.code,
                          )
                        : [...selectedValues, option],
                },
            },
        };
    });
}

export function addGuestDislikedFood(food: DislikedFood) {
    jotaiStore.set(guestRecommendationSettingAtom, (prev) => {
        const alreadySelected = prev.preference.dislikedFoods.some(
            (selectedFood) =>
                selectedFood.type === food.type &&
                selectedFood.id === food.id,
        );

        if (alreadySelected) {
            return prev;
        }

        return {
            ...prev,
            preference: {
                ...prev.preference,
                dislikedFoods: [...prev.preference.dislikedFoods, food],
            },
        };
    });
}

export function removeGuestDislikedFood(food: DislikedFood) {
    jotaiStore.set(guestRecommendationSettingAtom, (prev) => ({
        ...prev,
        preference: {
            ...prev.preference,
            dislikedFoods: prev.preference.dislikedFoods.filter(
                (selectedFood) =>
                    !(
                        selectedFood.type === food.type &&
                        selectedFood.id === food.id
                    ),
            ),
        },
    }));
}

export function updateGuestLocationCenter(center: GuestLocationCenter) {
    jotaiStore.set(guestRecommendationSettingAtom, (prev) => ({
        ...prev,
        location: {
            ...prev.location,
            latitude: center.latitude,
            longitude: center.longitude,
            level: center.level,
        },
    }));
}

export function updateGuestLocationAddress(address: string) {
    jotaiStore.set(guestRecommendationSettingAtom, (prev) => ({
        ...prev,
        location: {
            ...prev.location,
            address,
        },
    }));
}

export function updateGuestLocationRadius(radiusMeters: LocationRadiusMeters) {
    jotaiStore.set(guestRecommendationSettingAtom, (prev) => ({
        ...prev,
        location: {
            ...prev.location,
            radiusMeters,
        },
    }));
}