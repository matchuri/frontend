export const navbarStyles = {
  nav: "fixed top-0 right-0 z-50 flex h-16 items-center justify-between px-6 transition-all",
  logo: "text-lg font-bold tracking-tight text-slate-900",
  rightGroup: "flex items-center gap-4",
  authRightOnly: "ml-auto flex items-center gap-4",
  dropdown:
    "absolute right-0 top-[calc(100%+12px)] flex h-[72px] w-[224px] items-center rounded-[24px] border border-slate-200 bg-white px-4 shadow-[0_16px_40px_rgba(15,23,42,0.12)]",
  dropdownItem:
    "flex h-full w-full items-center gap-3 rounded-[20px] text-left text-[14px] font-medium text-slate-700 transition-colors hover:bg-slate-50",
  profileWrapper: "relative flex items-center",
} as const;

export const authButtonStyles = {
  base: "transition-colors",
  login: "rounded-md border border-slate-400 px-3 py-1.5 text-sm font-medium",
  profile: "flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200",
} as const;