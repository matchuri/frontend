export const dislikedFoodSearchStyles = {
  container: "flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm",
  header: "flex flex-col gap-1",
  title: "text-base font-semibold text-zinc-900",
  description: "text-sm text-zinc-500",
  searchWrapper: "relative",
  // 검색창 테두리
  input:
    "w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-400",
  resultList:
    "absolute left-0 top-11 z-10 flex w-full flex-col overflow-hidden rounded-md border border-zinc-200 bg-white shadow-md",
  resultItem: "px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-100",
  resultMessage: "px-3 py-2 text-sm text-zinc-500",
  errorMessage: "px-3 py-2 text-sm text-red-500",
  selectedList: "flex flex-wrap gap-2 pt-1",
  selectedTag:
    "flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700",
  removeButton: "text-blue-500 hover:text-blue-700",
} as const;