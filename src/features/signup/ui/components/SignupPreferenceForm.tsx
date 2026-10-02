import type { UserPreference } from "@/features/preference/domain/model/UserPreference";
import type { PreferenceOption } from "@/features/preference/domain/model/UserPreference";
import type { DislikedFood } from "@/features/preference/domain/model/UserPreference";
import type { PreferenceCategory } from "@/features/preference/domain/model/PreferenceCategory";

import PreferenceSection from "@/features/preference/ui/components/PreferenceSection";
import DislikedFoodSearch from "@/features/preference/ui/components/DislikedFoodSearch";

import {
    createPreferenceGroups,
    optionalPreferenceGroupMeta,
    requiredPreferenceGroupMeta,
} from "@/features/preference/ui/config/preferenceOptions";

import { signupOnboardingStyles } from "@/ui/styles/signupOnboardingStyles";

interface SignupPreferenceFormProps {
    readonly preference: UserPreference;
    readonly options: readonly PreferenceOption[];
    readonly keyword: string;
    readonly results: readonly DislikedFood[];
    readonly isSearching: boolean;
    readonly searchErrorMessage: string | null;
    readonly isSaving: boolean;
    readonly canSubmit: boolean;
    readonly onToggle: (
        category: PreferenceCategory,
        value: PreferenceOption,
    ) => void;
    readonly onSearch: (keyword: string) => void;
    readonly onSelectFood: (food: DislikedFood) => void;
    readonly onRemoveFood: (food: DislikedFood) => void;
    readonly onSubmit: () => void;
}

export default function SignupPreferenceForm({
    preference,
    options,
    keyword,
    results,
    isSearching,
    searchErrorMessage,
    isSaving,
    canSubmit,
    onToggle,
    onSearch,
    onSelectFood,
    onRemoveFood,
    onSubmit,
}: SignupPreferenceFormProps) {
    const requiredPreferenceGroups =
        createPreferenceGroups(
            requiredPreferenceGroupMeta,
            options,
        );

    const optionalPreferenceGroups =
        createPreferenceGroups(
            optionalPreferenceGroupMeta,
            options,
        );

    return (
        <div className={signupOnboardingStyles.preferenceContent}>
            <section className={signupOnboardingStyles.preferenceCard}>
                <div className={signupOnboardingStyles.sectionHeader}>
                    <div>
                        <h2 className={signupOnboardingStyles.sectionTitle}>
                            필수 선택
                        </h2>

                        <p className={signupOnboardingStyles.sectionDescription}>
                            메뉴 추천에 꼭 필요한 취향이에요.
                        </p>
                    </div>

                    <span className={signupOnboardingStyles.requiredBadge}>
                        필수
                    </span>
                </div>

                <div className={signupOnboardingStyles.sectionGroup}>
                    {requiredPreferenceGroups.map((group) => (
                        <PreferenceSection
                            key={group.category}
                            title={group.title}
                            description={group.description}
                            category={group.category}
                            options={group.options}
                            selectedValues={
                                preference.selections[group.category] ?? []
                            }
                            onToggle={onToggle}
                        />
                    ))}
                </div>
            </section>

            <section className={signupOnboardingStyles.preferenceCard}>
                <div className={signupOnboardingStyles.sectionHeader}>
                    <div>
                        <h2 className={signupOnboardingStyles.sectionTitle}>
                            추가 선택
                        </h2>

                        <p className={signupOnboardingStyles.sectionDescription}>
                            선택할수록 추천이 더 정교해져요.
                        </p>
                    </div>

                    <span className={signupOnboardingStyles.optionalBadge}>
                        선택
                    </span>
                </div>

                <div className={signupOnboardingStyles.sectionGroup}>
                    {optionalPreferenceGroups.map((group) => (
                        <PreferenceSection
                            key={group.category}
                            title={group.title}
                            description={group.description}
                            category={group.category}
                            options={group.options}
                            selectedValues={
                                preference.selections[group.category] ?? []
                            }
                            onToggle={onToggle}
                        />
                    ))}

                    <DislikedFoodSearch
                        keyword={keyword}
                        results={results}
                        selectedFoods={preference.dislikedFoods}
                        isSearching={isSearching}
                        searchErrorMessage={searchErrorMessage}
                        onSearch={onSearch}
                        onSelect={onSelectFood}
                        onRemove={onRemoveFood}
                    />
                </div>
            </section>

            <button
                type="button"
                onClick={onSubmit}
                disabled={!canSubmit || isSaving}
                className={signupOnboardingStyles.primaryButton}
            >
                {isSaving ? "저장 중..." : "가입 완료"}
            </button>
        </div>
    );
}