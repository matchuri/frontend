export const sidebarStyles = {
  container:
    "fixed top-0 left-0 w-[280px] h-screen border-r border-slate-200 bg-[#EDF2F7] px-5 py-6",
  brandSection: "mb-8 mt-2",
  brandLink: "flex items-center gap-3 px-3",
  brandIcon: "h-7 w-7 text-blue-500",
  brandText: "text-[20px] font-extrabold tracking-tight text-slate-900",
  nav: "flex flex-col gap-3 mt-6",
} as const;

export const sidebarMenuItemStyles = {
  base: "flex items-center gap-4 rounded-full px-5 py-4 text-[18px] font-semibold transition-colors",
  active: "bg-white text-blue-600",
  inactive: "text-slate-700 hover:bg-white/70",
  icon: "h-6 w-6 shrink-0",
} as const;