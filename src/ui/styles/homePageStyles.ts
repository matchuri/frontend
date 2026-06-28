export const homePageStyles = {
    container: "min-h-screen bg-white",

    heroSection:
        "mx-auto flex min-h-[760px] max-w-[1180px] items-center justify-between gap-16 px-10 pt-20",
    heroContent: "max-w-[520px]",

    badge:
        "mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600",
    badgeDot: "h-2 w-2 rounded-full bg-blue-500",

    title: "text-[56px] font-extrabold leading-[1.12] tracking-[-0.04em] text-zinc-950",
    titleHighlight: "text-blue-600",

    description: "mt-8 text-lg leading-8 text-zinc-600",

    buttonGroup: "mt-10 flex gap-4",
    startButton:
        "h-14 rounded-2xl cursor-pointer bg-blue-600 px-9 text-base font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 active:bg-blue-800",
    guideButton:
        "h-14 rounded-2xl cursor-pointer border border-zinc-300 bg-white px-9 text-base font-bold text-zinc-800 transition hover:bg-zinc-50 active:bg-zinc-100",

    imageWrapper: "relative h-[500px] w-[500px] overflow-hidden rounded-[28px] shadow-2xl shadow-blue-100",
    image: "object-cover",

    guideSection: "bg-blue-50 px-10 py-20",
    guideContent: "mx-auto max-w-[1120px]",
    guideHeader: "text-center",
    guideTitle: "text-4xl font-extrabold text-zinc-900",
    guideUnderline: "mx-auto mt-6 h-1 w-14 rounded-full bg-blue-600",
    guideGrid: "mt-16 grid grid-cols-3 gap-12",

    footer:
        "flex h-24 items-center justify-between border-t border-zinc-200 px-10 text-sm text-zinc-500",
    footerLinks: "flex gap-8",
} as const;