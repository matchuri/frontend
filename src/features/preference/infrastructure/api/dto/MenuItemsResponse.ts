export interface MenuItem {
    readonly id: number;
    readonly code: string;
    readonly name: string;
}

export interface MenuItemsResponse {
    readonly success: boolean;
    readonly data: readonly MenuItem[];
    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}