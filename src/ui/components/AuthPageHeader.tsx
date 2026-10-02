"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { authPageStyles } from "@/ui/styles/authPageStyles";

interface AuthPageHeaderProps {
    readonly title?: string;
    readonly backHref: string;
    readonly backLabel: string;
    readonly onBack?: () => void;
}

export default function AuthPageHeader({
    title,
    backHref,
    backLabel,
    onBack,
}: AuthPageHeaderProps) {
    return (
        <header className={authPageStyles.header}>
            {onBack ? (
                <button
                    type="button"
                    onClick={onBack}
                    className={authPageStyles.backButton}
                    aria-label={backLabel}
                >
                    <ArrowLeft size={24} aria-hidden="true" />
                </button>
            ) : (
                <Link
                    href={backHref}
                    className={authPageStyles.backButton}
                    aria-label={backLabel}
                >
                    <ArrowLeft size={24} aria-hidden="true" />
                </Link>
            )}

            {title ? (
                <h1 className={authPageStyles.headerTitle}>{title}</h1>
            ) : (
                <div />
            )}

            <div
                className={authPageStyles.headerSpacer}
                aria-hidden="true"
            />
        </header>
    );
}