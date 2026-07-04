export const settingsPageStyles = {
    page: "w-full px-14 py-16 bg-white",
    title: "text-3xl font-bold text-gray-900",
    description: "mt-2 text-base text-[#17345f]",
    section: "mt-10 rounded-[48px] bg-[#e8eef5] px-12 py-10",
    sectionTitle: "mb-10 flex items-center gap-3 text-xl font-bold text-gray-900",
    profileImageWrapper:
        "relative mb-10 flex h-32 w-32 items-center justify-center rounded-full bg-[#d9e2ec]",
    profileIcon: "text-[#6b7c93]",
    editButton:
        "absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#37639f] text-white shadow-md",
    formGroup: "flex flex-col gap-3",
    label: "text-sm font-semibold text-gray-800",
    input:
        "h-14 rounded-2xl bg-white px-5 text-sm text-gray-400 outline-none placeholder:text-gray-600",
    disabledInput:
        "h-20 rounded-2xl bg-[#d8d8d8] px-5 py-4 text-sm text-gray-500 outline-none",
    saveButtonWrapper: "mt-10 flex justify-end",
    saveButton:
        "flex h-12 w-44 items-center justify-center gap-8 rounded-full bg-[#37639f] text-white",
    accountRow: "flex items-center justify-between",
    divider: "my-10 border-t border-gray-300",
    dangerTitle: "font-bold text-red-500",
    dangerDescription: "mt-1 text-sm text-gray-600",
    dangerButton:
        "h-12 w-40 rounded-full border border-red-500 text-red-500 font-semibold",
    deleteMemberButton:
        "h-12 w-40 rounded-full border border-red-500 text-red-500 font-semibold cursor-pointer transition hover:bg-red-50 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50",

    modalOverlay:
        "fixed inset-0 z-50 flex items-center justify-center bg-black/40",
    modalBox:
        "w-[420px] rounded-[32px] bg-white p-8 shadow-xl",
    modalTitleWrapper:
        "mb-4 flex items-center gap-2 text-red-500",
    modalTitle:
        "text-lg font-bold",
    modalDescription:
        "text-sm leading-6 text-zinc-700",
    modalButtonWrapper:
        "mt-6 flex justify-end gap-3",
    modalCancelButton:
        "rounded-xl border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 cursor-pointer transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50",
    modalDangerButton:
        "rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white cursor-pointer transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50",

    skeletonProfileIcon:
        "h-16 w-16 animate-pulse rounded-full bg-[#c7d2df]",
    skeletonInput:
        "h-14 animate-pulse rounded-2xl bg-white",
    skeletonDisabledInput:
        "h-20 animate-pulse rounded-2xl bg-[#d8d8d8]",
    skeletonDisabledInputWithMargin:
        "mb-4 h-20 animate-pulse rounded-2xl bg-[#d8d8d8]",
    skeletonSaveButton:
        "h-12 w-44 animate-pulse rounded-full bg-[#c7d2df]",
};