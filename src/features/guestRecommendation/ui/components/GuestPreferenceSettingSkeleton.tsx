import Skeleton from "@/ui/components/Skeleton";

import { guestPreferenceSettingSkeletonStyles } from "@/ui/styles/guestPreferenceSettingSkeletonStyles";

const optionStyles = [
    guestPreferenceSettingSkeletonStyles.optionMedium,
    guestPreferenceSettingSkeletonStyles.optionLarge,
    guestPreferenceSettingSkeletonStyles.optionSmall,
    guestPreferenceSettingSkeletonStyles.optionXLarge,
    guestPreferenceSettingSkeletonStyles.optionMedium,
    guestPreferenceSettingSkeletonStyles.optionLarge,
] as const;

export default function GuestPreferenceSettingSkeleton() {
    return (
        <section
            className={guestPreferenceSettingSkeletonStyles.section}
            aria-busy="true"
            aria-label="취향 선택 항목을 불러오는 중"
        >
            <div className={guestPreferenceSettingSkeletonStyles.header}>
                <Skeleton className={guestPreferenceSettingSkeletonStyles.icon}/>

                <div className={guestPreferenceSettingSkeletonStyles.headerText}>
                    <Skeleton className={guestPreferenceSettingSkeletonStyles.title}/>
                    <Skeleton className={guestPreferenceSettingSkeletonStyles.description}/>
                </div>
            </div>

            <div className={guestPreferenceSettingSkeletonStyles.card}>
                <div className={guestPreferenceSettingSkeletonStyles.optionList}>
                    {optionStyles.map(
                        (className, index) => (
                            <Skeleton
                                key={index}
                                className={className}
                            />
                        ),
                    )}
                </div>

                <Skeleton className={guestPreferenceSettingSkeletonStyles.search}/>
            </div>
        </section>
    );
}