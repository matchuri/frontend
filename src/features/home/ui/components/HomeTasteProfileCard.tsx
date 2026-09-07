import { SlidersHorizontal } from "lucide-react";

import { homeMemberPageStyles } from "@/ui/styles/homeMemberPageStyles";

interface HomeTasteProfileCardProps {
    readonly attributes: readonly string[];
    readonly onClickEdit: () => void;
}

const MAX_VISIBLE_TASTE_COUNT = 3;

export default function HomeTasteProfileCard({
    attributes,
    onClickEdit,
}: HomeTasteProfileCardProps) {
    const visibleAttributes =
        attributes.slice(0, MAX_VISIBLE_TASTE_COUNT);

    const hiddenAttributeCount =
        Math.max(attributes.length - MAX_VISIBLE_TASTE_COUNT, 0);

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
                    {attributes.length > 0 ? (
                        <>
                            {visibleAttributes.map((attribute) => (
                                <span
                                    key={attribute}
                                    className={homeMemberPageStyles.tasteChip}
                                >
                                    {attribute}
                                </span>
                            ))}

                            {hiddenAttributeCount > 0 && (
                                <span className={homeMemberPageStyles.tasteMoreChip}>
                                    +{hiddenAttributeCount}
                                </span>
                            )}
                        </>
                    ) : (
                        <span className={homeMemberPageStyles.tasteEmptyText}>
                            설정된 취향이 없습니다.
                        </span>
                    )}
                </div>
            </div>

            <button
                type="button"
                onClick={onClickEdit}
                className={homeMemberPageStyles.tasteEditButton}
            >
                수정
            </button>
        </section>
    );
}