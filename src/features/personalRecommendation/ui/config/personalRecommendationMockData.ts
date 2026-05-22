export const personalRecommendationLocationMock = {
    address: "서울 서초동 서초구 118",
} as const;

export const personalRecommendationHistoryMock: readonly {
    id: number;
    menuName: string;
    recommendedAt: string;
}[] = [];