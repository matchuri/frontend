import type { PreferenceCategory } from "@/features/preference/domain/model/PreferenceCategory";
import type { PreferenceOption } from "@/features/preference/domain/model/UserPreference";
import { preferenceSectionStyles } from "@/ui/styles/preferenceSectionStyles";

interface PreferenceSectionProps {
    readonly title: string;
    readonly description?: string;
    readonly category: PreferenceCategory;
    readonly options: readonly PreferenceOption[];
    readonly selectedValues: readonly PreferenceOption[];
    readonly onToggle: (
        category: PreferenceCategory,
        value: PreferenceOption,
    ) => void;
}

export default function PreferenceSection({
    title,
    description,
    category,
    options,
    selectedValues,
    onToggle,
}: PreferenceSectionProps) {
    return (
        <section className={preferenceSectionStyles.container}>
            <div className={preferenceSectionStyles.header}>
                <h3 className={preferenceSectionStyles.title}>{title}</h3>
                {description && (
                    <p className={preferenceSectionStyles.description}>
                        {description}
                    </p>
                )}
            </div>

            <div className={preferenceSectionStyles.chipGroup}>
                {options.map((option) => {
                    const selected = selectedValues.some(
                        (selectedValue) => selectedValue.code === option.code,
                    );

                    return (
                        <button
                            key={option.code}
                            type="button"
                            onClick={() => onToggle(category, option)}
                            className={
                                selected
                                    ? preferenceSectionStyles.selectedChip
                                    : preferenceSectionStyles.chip
                            }
                        >
                            {option.name}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}