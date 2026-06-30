export const preferencePageStyles = {
  container: "min-h-screen bg-sky-100 px-4 py-8",
  content: "mx-auto flex w-full max-w-3xl flex-col gap-6",
  header: "flex flex-col gap-2",
  title: "text-2xl font-bold text-zinc-900",
  description: "text-sm text-zinc-600",
  sectionGroup: "flex flex-col gap-4",
  sectionTitle: "text-lg font-bold text-zinc-900",
  saveButton:
    "w-full rounded-md bg-blue-500 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:bg-zinc-300",
  loadingBox: "flex min-h-screen items-center justify-center bg-sky-100",
  errorBox: "flex min-h-screen items-center justify-center bg-sky-100 px-4",
  errorText: "text-sm font-medium text-red-500",
} as const;