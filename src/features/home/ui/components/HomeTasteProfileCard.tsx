import { SlidersHorizontal } from "lucide-react";

import { homeMemberPageStyles } from "@/ui/styles/homeMemberPageStyles";

interface HomeTasteProfileCardProps {
    readonly attributes: readonly string[];
}

export default function HomeTasteProfileCard({
    attributes,
}: HomeTasteProfileCardProps) {
    return (
        <section className={homeMemberPageStyles.tasteCard}>
            <div className={homeMemberPageStyles.tasteIcon}>
                <SlidersHorizontal
                    size={20}
                    aria-hidden="true"
                />
            </div>

            <div className={homeMemberPageStyles.tasteContent}>
                <h2 className={homeMemberPageStyles.tasteTitle}>
                    취향 프로필
                </h2>

                <div className={homeMemberPageStyles.chipGroup}>
                    {attributes.map((attribute) => (
                        <span
                            key={attribute}
                            className={homeMemberPageStyles.tasteChip}
                        >
                            {attribute}
                        </span>
                    ))}
                </div>
            </div>

            <button
                type="button"
                className={homeMemberPageStyles.tasteEditButton}
            >
                수정
            </button>
        </section>
    );
}