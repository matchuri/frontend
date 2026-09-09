import { SlidersHorizontal } from "lucide-react";

import type { PreferenceCategory } from "@/features/preference/domain/model/PreferenceCategory";
import type {
    DislikedFood,
    PreferenceOption,
    UserPreference,
} from "@/features/preference/domain/model/UserPreference";

import PreferenceFormContent from "@/features/preference/ui/components/PreferenceFormContent";

import { guestRecommendationPageStyles } from "@/ui/styles/guestRecommendationPageStyles";

interface GuestPreferenceSettingSectionProps {
    readonly preference: UserPreference;
    readonly options: readonly PreferenceOption[];
    readonly searchKeyword: string;
    readonly searchResults: readonly DislikedFood[];
    readonly isSearching: boolean;
    readonly searchErrorMessage: string | null;

    readonly onTogglePreference: (
        category: PreferenceCategory,
        option: PreferenceOption,
    ) => void;

    readonly onSearch: (keyword: string) => void;
    readonly onAddDislikedFood: (food: DislikedFood) => void;
    readonly onRemoveDislikedFood: (food: DislikedFood) => void;
}

export default function GuestPreferenceSettingSection({
    preference,
    options,
    searchKeyword,
    searchResults,
    isSearching,
    searchErrorMessage,
    onTogglePreference,
    onSearch,
    onAddDislikedFood,
    onRemoveDislikedFood,
}: GuestPreferenceSettingSectionProps) {
    return (
        <section className={guestRecommendationPageStyles.settingSection}>
            <div className={guestRecommendationPageStyles.settingSectionHeader}>
                <div className={guestRecommendationPageStyles.settingSectionIcon}>
                    <SlidersHorizontal
                        size={20}
                        strokeWidth={2}
                        aria-hidden="true"
                    />
                </div>

                <div>
                    <h2 className={guestRecommendationPageStyles.settingSectionTitle}>
                        취향 설정
                    </h2>

                    <p className={guestRecommendationPageStyles.settingSectionDescription}>
                        좋아하는 취향과 피하고 싶은 음식을 알려주세요.
                    </p>
                </div>
            </div>

            <PreferenceFormContent
                preference={preference}
                options={options}
                onTogglePreference={onTogglePreference}
                searchKeyword={searchKeyword}
                searchResults={searchResults}
                isSearching={isSearching}
                searchErrorMessage={searchErrorMessage}
                onSearch={onSearch}
                onAddDislikedFood={onAddDislikedFood}
                onRemoveDislikedFood={onRemoveDislikedFood}
            />
        </section>
    );
}