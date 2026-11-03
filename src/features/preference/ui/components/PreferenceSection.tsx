import type { PreferenceCategory } from "@/features/preference/domain/model/PreferenceCategory";
import type { PreferenceOption } from "@/features/preference/domain/model/UserPreference";
import { preferenceSectionStyles } from "@/ui/styles/preferenceSectionStyles";

type PreferenceSectionHeadingLevel = "h3" | "h4";

interface PreferenceSectionProps {
    readonly title: string;
    readonly headingLevel?: PreferenceSectionHeadingLevel;
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
    headingLevel = "h3",
    description,
    category,
    options,
    selectedValues,
    onToggle,
}: PreferenceSectionProps) {
    const Heading = headingLevel;

    return (
        <section className={preferenceSectionStyles.container}>
            <div className={preferenceSectionStyles.header}>
                <Heading className={preferenceSectionStyles.title}>{title}</Heading>
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
                            aria-pressed={selected}
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