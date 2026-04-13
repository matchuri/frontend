export const navbarStyles = {
  nav: "fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-6 bg-transparent backdrop-blur-sm",
  logo: "text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50",
  menuGroup: "flex items-center gap-6",
  rightGroup: "flex items-center gap-4",
  dropdown:
    "absolute right-0 mt-2 w-44 overflow-hidden rounded-md border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900",
  dropdownItem:
    "w-full px-4 py-2 text-left text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800",
  dropdownDivider:
    "h-px w-full bg-zinc-200 dark:bg-zinc-700",
} as const;

export const authButtonStyles = {
  base: "rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-150",
  login:
    "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300",
  profile:
    "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700",
  logout:
    "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20",
} as const;