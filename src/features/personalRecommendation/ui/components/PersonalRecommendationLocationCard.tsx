import { MapPin } from "lucide-react";
import { personalRecommendationPageStyles } from "@/ui/styles/personalRecommendationPageStyles";

interface PersonalRecommendationLocationCardProps {
    readonly address: string;
    readonly onClickEdit: () => void;
}

export default function PersonalRecommendationLocationCard({
    address,
    onClickEdit,
}: PersonalRecommendationLocationCardProps) {
    return (
        <section className={personalRecommendationPageStyles.locationCard}>
            <div className={personalRecommendationPageStyles.iconBox}>
                <MapPin size={22} />
            </div>

            <div className={personalRecommendationPageStyles.cardTextGroup}>
                <h3 className={personalRecommendationPageStyles.cardTitle}>
                    현재 위치
                </h3>

                <p className={personalRecommendationPageStyles.cardDescription}>
                    {address}
                </p>
            </div>

            <button
                type="button"
                onClick={onClickEdit}
                className={personalRecommendationPageStyles.smallButton}
            >
                위치 수정하기
            </button>
        </section>
    );
}