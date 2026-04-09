export const loginPageStyles = {
  container: "flex min-h-screen items-center justify-center bg-sky-100 px-4",
  card: "flex w-full max-w-md flex-col gap-6 rounded-2xl bg-white p-8 shadow-md",
  title: "text-2xl font-bold text-zinc-900 text-left",
  formGroup: "flex flex-col gap-4 w-full",
  inputGroup: "flex flex-col gap-1",
  label: "text-sm font-medium text-zinc-700",
  input: "w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400",
  loginButton: "w-full rounded-md bg-blue-500 py-2 text-white font-semibold hover:bg-blue-600 transition",
  divider: "flex items-center gap-3 text-sm text-zinc-400",
  dividerLine: "flex-1 h-px bg-zinc-300",
  buttonGroup: "flex flex-col gap-3 font-semibold",
} as const;