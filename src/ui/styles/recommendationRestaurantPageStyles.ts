export const recommendationRestaurantPageStyles = {
    container: "flex h-screen overflow-hidden bg-white",

    listSection:
        "flex w-[520px] shrink-0 flex-col overflow-y-auto bg-[#FAF9F9] px-14 py-10",

    backButton:
        "mb-10 flex aspect-square h-14 w-14 min-w-14 max-w-14 shrink-0 cursor-pointer items-center justify-center rounded-full p-0 text-zinc-800 transition-colors hover:bg-zinc-200 active:bg-zinc-300",

    titleSection: "mb-12",
    title: "text-4xl font-bold text-zinc-900",
    selectedMenuText: "mt-3 text-lg font-semibold text-orange-500",

    restaurantList: "flex flex-col gap-5 pb-10",
    restaurantCard:
        "flex cursor-pointer rounded-[28px] bg-white px-6 py-5 shadow-sm transition hover:bg-zinc-50 active:bg-zinc-100",
    selectedRestaurantCard:
        "flex cursor-pointer rounded-[28px] border-2 border-orange-400 bg-white px-6 py-5 shadow-md transition hover:bg-orange-50 active:bg-orange-100",
    restaurantInfo: "min-w-0 flex-1",
    restaurantName: "truncate text-base font-bold text-zinc-900",
    restaurantDistance: "mt-1 text-sm font-semibold text-orange-500",
    restaurantAddress:
        "mt-3 flex items-start gap-1 text-sm font-medium leading-5 text-zinc-500",
    restaurantPhone:
        "mt-2 flex items-center gap-1 text-sm font-medium text-zinc-400",

    messageBox:
        "rounded-3xl bg-white px-6 py-8 text-center text-base font-semibold text-zinc-500",

    errorBox:
        "rounded-3xl bg-red-50 px-6 py-8 text-center text-base font-semibold text-red-500",

    mapArea: "relative min-w-0 flex-1 overflow-hidden bg-[#E9E7E2]",
    mapContainer: "h-full w-full",
} as const;