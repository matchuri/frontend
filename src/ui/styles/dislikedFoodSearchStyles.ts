export const dislikedFoodSearchStyles = {
    container: "flex flex-col gap-3 border-t border-gray-100 pt-6",
    header: "flex flex-col gap-1",
    title: "text-[15px] font-semibold text-gray-800",
    description: "text-[12px] leading-5 text-gray-400",
    searchWrapper: "relative",
    input:
        "h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[14px] text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#FB6F00] focus:bg-white",
    resultList:
        "absolute left-0 right-0 top-[52px] z-20 max-h-[200px] overflow-y-auto rounded-xl border border-gray-100 bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
    resultItem:
        "flex w-full cursor-pointer items-center rounded-lg px-3 py-2.5 text-left text-[13px] text-gray-700 transition-colors hover:bg-orange-50 hover:text-[#FB6F00]",
    resultMessage: "px-3 py-3 text-[13px] text-gray-400",
    errorMessage: "px-3 py-3 text-[13px] text-red-500",
    selectedList: "flex flex-wrap gap-2",
    selectedTag: "flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-[12px] font-medium text-[#FB6F00]",
    removeButton:
        "flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-[#FB6F00] transition-colors hover:bg-orange-100",
} as const;