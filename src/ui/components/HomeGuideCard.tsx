import type { ReactNode } from "react";

import { homeGuideCardStyles } from "@/ui/styles/homeGuideCardStyles";

interface HomeGuideCardProps {
    readonly step: string;
    readonly title: string;
    readonly description: ReactNode;
    readonly icon: ReactNode;
}

export default function HomeGuideCard({
    step,
    title,
    description,
    icon,
}: HomeGuideCardProps) {
    return (
        <article className={homeGuideCardStyles.card}>
            <div className={homeGuideCardStyles.stepBox}>
                {step}

                <span className={homeGuideCardStyles.iconBadge}>
                    {icon}
                </span>
            </div>

            <h3 className={homeGuideCardStyles.title}>
                {title}
            </h3>

            <p className={homeGuideCardStyles.description}>
                {description}
            </p>
        </article>
    );
}