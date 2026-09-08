export interface GuestRecommendedMenu {
    readonly menuId: number;
    readonly menuName: string;
    readonly rankNo: number;
    readonly score: number;
}

export interface GuestRecommendation {
    readonly candidates: readonly GuestRecommendedMenu[];
}