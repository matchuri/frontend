export const preferenceSectionStyles = {
  container: "flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm",
  header: "flex flex-col gap-1",
  title: "text-base font-semibold text-zinc-900",
  description: "text-sm text-zinc-500",
  chipGroup: "flex flex-wrap gap-2",
  chip: "rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50",
  selectedChip:
    "rounded-full border border-blue-500 bg-blue-500 px-4 py-2 text-sm font-medium text-white",
} as const;