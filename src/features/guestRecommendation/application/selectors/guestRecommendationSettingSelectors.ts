import { atom } from "jotai";

import { guestRecommendationSettingAtom } from "@/features/guestRecommendation/application/atoms/guestRecommendationSettingAtom";

export const guestPreferenceAtom = atom(
    (get) => get(guestRecommendationSettingAtom).preference,
);

export const guestLocationAtom = atom(
    (get) => get(guestRecommendationSettingAtom).location,
);