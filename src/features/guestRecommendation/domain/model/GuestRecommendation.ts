export interface GuestRecommendedMenu {
    readonly menuId: number;
    readonly menuName: string;
    readonly rankNo: number;
    readonly score: number;
    readonly thumbnailUrl: string | null;
}

export interface GuestRecommendation {
    readonly candidates: readonly GuestRecommendedMenu[];
}