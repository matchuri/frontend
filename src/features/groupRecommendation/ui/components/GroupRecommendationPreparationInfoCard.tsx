import { MapPin } from "lucide-react";

import { formatLocationRadius } from "@/features/locationSetting/domain/config/locationRadiusPolicy";

import { groupRecommendationPreparationPageStyles } from "@/ui/styles/groupRecommendationPreparationPageStyles";

interface GroupRecommendationPreparationInfoCardProps {
    readonly name: string;
    readonly address: string;
    readonly radiusMeters: number;
}

export default function GroupRecommendationPreparationInfoCard({
    name,
    address,
    radiusMeters,
}: GroupRecommendationPreparationInfoCardProps) {
    return (
        <section className={groupRecommendationPreparationPageStyles.infoCard}>
            <p className={groupRecommendationPreparationPageStyles.infoLabel}>
                함께 메뉴를 고를 그룹
            </p>

            <h2 className={groupRecommendationPreparationPageStyles.infoTitle}>
                {name}
            </h2>

            <div className={groupRecommendationPreparationPageStyles.infoLocation}>
                <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span className={groupRecommendationPreparationPageStyles.infoAddress}>
                    {address}
                </span>
                <span className={groupRecommendationPreparationPageStyles.infoRadius}>
                    반경 {formatLocationRadius(radiusMeters)}
                </span>
            </div>
        </section>
    );
}