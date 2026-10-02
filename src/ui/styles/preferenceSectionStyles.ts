export const preferenceSectionStyles = {
    container: "flex flex-col gap-3",
    header: "flex flex-col gap-1",
    title: "text-[14px] font-semibold text-gray-800",
    description: "text-[12px] leading-5 text-gray-400",
    chipGroup: "flex flex-wrap gap-2",
    chip:
        "cursor-pointer rounded-full border border-gray-200 bg-white px-4 py-2 " +
        "text-[12px] font-medium text-gray-600 transition-all duration-150 " +
        "hover:border-orange-200 hover:bg-orange-50 hover:text-[#FB6F00]",
    selectedChip:
        "cursor-pointer rounded-full border border-[#FB6F00] bg-orange-50 px-4 py-2 " +
        "text-[12px] font-medium text-[#FB6F00] transition-all duration-150 " +
        "hover:bg-orange-100",
} as const;