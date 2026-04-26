import type { PreferenceCategory } from "@/features/preference/domain/model/PreferenceCategory";
import { preferenceSectionStyles } from "@/ui/styles/preferenceSectionStyles";

interface PreferenceSectionProps {
    readonly title: string;
    readonly description?: string;
    readonly category: PreferenceCategory;
    readonly options: readonly string[];
    readonly selectedValues: readonly string[];
    readonly onToggle: (category: PreferenceCategory, value: string) => void;
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
              <p className={preferenceSectionStyles.description}>{description}</p>
            )}
          </div>

          <div className={preferenceSectionStyles.chipGroup}>
            {options.map((option) => {
              const selected = selectedValues.includes(option);

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onToggle(category, option)}
                  className={
                    selected
                      ? preferenceSectionStyles.selectedChip
                      : preferenceSectionStyles.chip
                  }
                >
                  {option}
                </button>
              );
            })}
          </div>
        </section>
    );
}