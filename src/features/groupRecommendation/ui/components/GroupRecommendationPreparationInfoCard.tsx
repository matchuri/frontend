import { CalendarDays, MapPin, Users } from "lucide-react";

import { groupRecommendationPreparationPageStyles } from "@/ui/styles/groupRecommendationPreparationPageStyles";

interface GroupRecommendationPreparationInfoCardProps {
    readonly name: string;
    readonly createdAt: string;
    readonly address: string;
    readonly memberCount: number;
}

export default function GroupRecommendationPreparationInfoCard({
    name,
    createdAt,
    address,
    memberCount,
}: GroupRecommendationPreparationInfoCardProps) {
    return (
        <aside className={groupRecommendationPreparationPageStyles.infoCard}>
            <h2 className={groupRecommendationPreparationPageStyles.infoTitle}>
                {name}
            </h2>

            <div className={groupRecommendationPreparationPageStyles.infoList}>
                <div className={groupRecommendationPreparationPageStyles.infoItem}>
                    <div className={groupRecommendationPreparationPageStyles.infoIcon}>
                        <CalendarDays size={20} />
                    </div>

                    <div>
                        <p className={groupRecommendationPreparationPageStyles.infoLabel}>
                            생성일
                        </p>
                        <p className={groupRecommendationPreparationPageStyles.infoValue}>
                            {createdAt}
                        </p>
                    </div>
                </div>

                <div className={groupRecommendationPreparationPageStyles.infoItem}>
                    <div className={groupRecommendationPreparationPageStyles.infoIcon}>
                        <MapPin size={20} />
                    </div>

                    <div>
                        <p className={groupRecommendationPreparationPageStyles.infoLabel}>
                            위치
                        </p>
                        <p className={groupRecommendationPreparationPageStyles.infoValue}>
                            {address}
                        </p>
                    </div>
                </div>

                <div className={groupRecommendationPreparationPageStyles.infoItem}>
                    <div className={groupRecommendationPreparationPageStyles.infoIcon}>
                        <Users size={20} />
                    </div>

                    <div>
                        <p className={groupRecommendationPreparationPageStyles.infoLabel}>
                            참여 인원
                        </p>
                        <p className={groupRecommendationPreparationPageStyles.infoValue}>
                            {memberCount}명
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}