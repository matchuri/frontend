export const navbarStyles = {
  nav: "fixed top-0 right-0 z-50 flex h-16 items-center justify-between px-6 transition-all",
  logo: "text-lg font-bold tracking-tight text-slate-900",
  rightGroup: "flex items-center gap-4",
  authRightOnly: "ml-auto flex items-center gap-4",
  dropdown:
    "absolute right-0 mt-2 w-44 overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg",
  dropdownItem:
    "w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100",
} as const;

export const authButtonStyles = {
  base: "rounded-md px-3 py-1.5 text-sm font-medium",
  login: "border border-slate-400",
  profile: "border border-slate-300 bg-transparent",
} as const;