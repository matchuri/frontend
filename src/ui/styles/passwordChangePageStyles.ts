export const passwordChangePageStyles = {
    page: "min-h-full bg-white",
    header: "relative flex h-[64px] items-center justify-between border-b border-gray-100 px-5",
    backButton:
        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-100",
    title: "absolute left-1/2 -translate-x-1/2 text-[18px] font-bold text-gray-900",
    headerSpacer: "h-10 w-10",
    content: "px-7 pb-10 pt-10",

    introSection: "flex flex-col items-center text-center",
    iconWrapper: "flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-[#FB6F00]",
    introTitle: "mt-4 text-[18px] font-bold text-gray-900",
    introDescription: "mt-2 max-w-[340px] text-[14px] leading-6 text-gray-500",

    form: "mt-10 flex flex-col gap-6",
    field: "flex flex-col gap-2",
    label: "text-[14px] font-semibold text-gray-800",

    inputWrapper: "relative",
    input:
        "h-12 w-full rounded-xl border border-gray-200 bg-white px-4 pr-12 text-[15px] text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#FB6F00]",
    passwordToggleButton:
        "absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600",

    helperText: "text-[12px] leading-5 text-gray-400",
    errorText: "text-[12px] leading-5 text-red-500",

    submitButton:
        "mt-3 h-14 w-full cursor-pointer rounded-xl bg-[#FB6F00] text-[16px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:opacity-100",
} as const;