"use client";

import {
    ClipboardEvent,
    KeyboardEvent,
    useRef,
} from "react";

import { authPageStyles } from "@/ui/styles/authPageStyles";

interface VerificationCodeInputProps {
    readonly value: string;
    readonly onChange: (value: string) => void;
    readonly disabled?: boolean;
    readonly isError?: boolean;
    readonly length?: number;
}

export default function VerificationCodeInput({
    value,
    onChange,
    disabled = false,
    isError = false,
    length = 6,
}: VerificationCodeInputProps) {
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const digits = Array.from(
        { length },
        (_, index) => value[index] ?? "",
    );

    const handleChange = (index: number, nextValue: string) => {
        const digit = nextValue.replace(/\D/g, "").slice(-1);
        const nextDigits = [...digits];

        nextDigits[index] = digit;

        onChange(nextDigits.join(""));

        if (digit && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        event: KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === "Backspace" && !digits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (event.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (event.key === "ArrowRight" && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (
        event: ClipboardEvent<HTMLInputElement>,
    ) => {
        event.preventDefault();

        const pastedValue = event.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, length);

        if (!pastedValue) return;

        onChange(pastedValue);

        const nextIndex = Math.min(pastedValue.length, length - 1);

        inputRefs.current[nextIndex]?.focus();
    };

    return (
        <div
            className={authPageStyles.codeInputGroup}
            onPaste={handlePaste}
        >
            {digits.map((digit, index) => (
                <input
                    key={index}
                    ref={(element) => {inputRefs.current[index] = element;}}
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    value={digit}
                    onChange={(event) => handleChange(index, event.target.value)}
                    onKeyDown={(event) => handleKeyDown(index, event)}
                    disabled={disabled}
                    className={
                        isError
                            ? `${authPageStyles.codeInput} ${authPageStyles.codeInputError}`
                            : authPageStyles.codeInput
                    }
                    aria-label={`인증번호 ${index + 1}번째 자리`}
                    aria-invalid={isError}
                />
            ))}
        </div>
    );
}