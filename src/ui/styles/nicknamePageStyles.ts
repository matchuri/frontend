export const nicknamePageStyles = {
  container: "flex min-h-screen items-center justify-center bg-sky-100 px-4",
  card: "flex w-full max-w-md flex-col gap-6 rounded-2xl bg-white p-8 shadow-md",
  title: "text-2xl font-bold text-zinc-900",
  formGroup: "flex flex-col gap-4 w-full",
  inputGroup: "flex flex-col gap-1",
  label: "text-sm font-medium text-zinc-700",
  input:
    "w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-400",
  button:
    "px-6 py-2 rounded-full bg-slate-500 text-white text-sm font-semibold hover:bg-slate-600 transition",
} as const;