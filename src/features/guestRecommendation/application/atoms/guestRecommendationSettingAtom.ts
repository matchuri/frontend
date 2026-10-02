import { atom } from "jotai";

import type { GuestRecommendationSetting } from "@/features/guestRecommendation/domain/model/GuestRecommendationSetting";
import { defaultGuestRecommendationSetting } from "@/features/guestRecommendation/domain/config/defaultGuestRecommendationSetting";

export const guestRecommendationSettingAtom = atom<GuestRecommendationSetting>(
    defaultGuestRecommendationSetting,
);