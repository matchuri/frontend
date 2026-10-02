import type { PreferenceCategory } from "@/features/preference/domain/model/PreferenceCategory";
import type {
    DislikedFood,
    PreferenceOption,
    UserPreference,
} from "@/features/preference/domain/model/UserPreference";

import PreferenceSection from "@/features/preference/ui/components/PreferenceSection";
import DislikedFoodSearch from "@/features/preference/ui/components/DislikedFoodSearch";

import {
    createPreferenceGroups,
    optionalPreferenceGroupMeta,
    requiredPreferenceGroupMeta,
} from "@/features/preference/ui/config/preferenceOptions";

import { preferenceModalStyles } from "@/ui/styles/preferenceModalStyles";

interface PreferenceFormContentProps {
    readonly preference: UserPreference;
    readonly options: readonly PreferenceOption[];

    readonly onTogglePreference: (
        category: PreferenceCategory,
        option: PreferenceOption,
    ) => void;

    readonly searchKeyword: string;
    readonly searchResults: readonly DislikedFood[];
    readonly isSearching: boolean;
    readonly searchErrorMessage: string | null;

    readonly onSearch: (keyword: string) => void;
    readonly onAddDislikedFood: (food: DislikedFood) => void;
    readonly onRemoveDislikedFood: (food: DislikedFood) => void;
}

export default function PreferenceFormContent({
    preference,
    options,
    onTogglePreference,
    searchKeyword,
    searchResults,
    isSearching,
    searchErrorMessage,
    onSearch,
    onAddDislikedFood,
    onRemoveDislikedFood,
}: PreferenceFormContentProps) {
    const requiredPreferenceGroups = createPreferenceGroups(
        requiredPreferenceGroupMeta,
        options,
    );

    const optionalPreferenceGroups = createPreferenceGroups(
        optionalPreferenceGroupMeta,
        options,
    );

    return (
        <>
            <section className={preferenceModalStyles.preferenceCard}>
                <div className={preferenceModalStyles.sectionHeader}>
                    <div>
                        <h3 className={preferenceModalStyles.sectionTitle}>
                            필수 선택
                        </h3>

                        <p className={preferenceModalStyles.sectionDescription}>
                            메뉴 추천에 꼭 필요한 취향이에요.
                        </p>
                    </div>

                    <span className={preferenceModalStyles.requiredBadge}>
                        필수
                    </span>
                </div>

                <div className={preferenceModalStyles.sectionGroup}>
                    {requiredPreferenceGroups.map((group) => (
                        <PreferenceSection
                            key={group.category}
                            title={group.title}
                            description={group.description}
                            category={group.category}
                            options={group.options}
                            selectedValues={preference.selections[group.category] ?? []}
                            onToggle={onTogglePreference}
                        />
                    ))}
                </div>
            </section>

            <section className={preferenceModalStyles.preferenceCard}>
                <div className={preferenceModalStyles.sectionHeader}>
                    <div>
                        <h3 className={preferenceModalStyles.sectionTitle}>
                            추가 선택
                        </h3>

                        <p className={preferenceModalStyles.sectionDescription}>
                            선택할수록 추천이 더 정교해져요.
                        </p>
                    </div>

                    <span className={preferenceModalStyles.optionalBadge}>
                        선택
                    </span>
                </div>

                <div className={preferenceModalStyles.sectionGroup}>
                    {optionalPreferenceGroups.map((group) => (
                        <PreferenceSection
                            key={group.category}
                            title={group.title}
                            description={group.description}
                            category={group.category}
                            options={group.options}
                            selectedValues={preference.selections[group.category] ?? []}
                            onToggle={onTogglePreference}
                        />
                    ))}

                    <DislikedFoodSearch
                        keyword={searchKeyword}
                        results={searchResults}
                        selectedFoods={preference.dislikedFoods}
                        isSearching={isSearching}
                        searchErrorMessage={searchErrorMessage}
                        onSearch={onSearch}
                        onSelect={onAddDislikedFood}
                        onRemove={onRemoveDislikedFood}
                    />
                </div>
            </section>
        </>
    );
}