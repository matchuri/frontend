export const signupMultiStepStyles = {
    progressHeader: "mb-8 flex flex-col gap-3",
    progressText: "text-[13px] font-semibold text-[#FB6F00]",
    progressTrack: "h-1.5 w-full overflow-hidden rounded-full bg-orange-100",
    progressBar: "h-full rounded-full bg-[#FB6F00] transition-[width] duration-300 ease-out",

    email: "mr-1 font-semibold text-gray-700",

    verificationTime: "flex items-center justify-center gap-1.5 text-[13px] text-gray-500",

    resend: "mt-5 flex items-center justify-center gap-1.5 text-[13px] text-gray-500",
    attemptText: "mt-2 text-center text-[12px] text-gray-400",
} as const;