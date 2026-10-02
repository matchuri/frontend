import AuthRequiredGuard from "@/features/routeGuard/ui/components/AuthRequiredGuard";
import GroupRecommendationVoteResultContent from "@/features/groupRecommendation/ui/components/GroupRecommendationVoteResultContent";

export default function GroupRecommendationVoteResultPage() {
    return (
        <AuthRequiredGuard>
            <GroupRecommendationVoteResultContent />
        </AuthRequiredGuard>
    );
}