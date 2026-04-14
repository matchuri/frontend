export const termsPageStyles = {
  container: "flex min-h-screen items-center justify-center bg-sky-100 py-8",
  card: "flex w-full max-w-lg flex-col items-center gap-8 rounded-lg border border-zinc-200 bg-white p-8",
  title: "text-2xl font-bold tracking-tight text-zinc-900",
  description: "text-sm text-zinc-500",
  termList: "flex w-full flex-col gap-4",
  allAgreeRow: "flex w-full items-center gap-2 rounded-md border border-zinc-300 px-4 py-3",
  allAgreeCheckbox: "h-4 w-4 accent-zinc-900",
  allAgreeLabel: "text-sm font-semibold text-zinc-900",
  submitButton: "w-full rounded-md bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800",
  submitButtonDisabled: "w-full rounded-md bg-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-500 cursor-not-allowed",
} as const;

export const termGroupStyles = {
  container: "w-full rounded-md border border-zinc-200",
  header: "flex items-center justify-between px-4 py-3",
  checkboxLabel: "flex items-center gap-2 cursor-pointer",
  checkbox: "h-4 w-4 accent-zinc-900",
  nameRow: "flex items-center gap-2",
  name: "text-sm font-semibold text-zinc-900",
  requiredBadge: "rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700",
  optionalBadge: "rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600",
  toggleButton: "text-xs font-medium text-zinc-500 underline hover:text-zinc-700",
  content: "border-t border-zinc-200 px-4 py-3",
  section: "mb-3 last:mb-0",
  sectionTitle: "text-xs font-semibold text-zinc-700",
  sectionText: "text-xs text-zinc-500 leading-relaxed",
} as const;
