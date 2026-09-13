"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import type { TermGroup } from "@/features/terms/domain/model/termSection";
import { signupTermGroupStyles } from "@/ui/styles/signupOnboardingStyles";

interface TermGroupItemProps {
    termGroup: TermGroup;
    checked: boolean;
    onToggle: () => void;
}

export default function TermGroupItem({ termGroup, checked, onToggle }: TermGroupItemProps) {
    const [expanded, setExpanded] = useState(false); // 약관 내용 펼침 여부

    return (
        <div className={signupTermGroupStyles.container}>
            <div className={signupTermGroupStyles.header}>
                <label className={signupTermGroupStyles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={onToggle}
                        className={signupTermGroupStyles.checkboxInput}
                    />
                    <span className={signupTermGroupStyles.checkboxVisual}>
                        <Check
                            size={14}
                            strokeWidth={3}
                            aria-hidden="true"
                        />
                    </span>
                    <span className={signupTermGroupStyles.name}>{termGroup.name}</span>
                    <span
                        className={
                            termGroup.required
                                ? signupTermGroupStyles.requiredBadge
                                : signupTermGroupStyles.optionalBadge
                        }
                    >
                        {termGroup.required ? "필수" : "선택"}
                    </span>
                </label>

                <button
                    type="button"
                    onClick={() => setExpanded(!expanded)}
                    className={signupTermGroupStyles.toggleButton}
                >
                    {expanded ? "접기" : "내용 보기"}
                </button>
            </div>

            {expanded && (
                <div className={signupTermGroupStyles.content}>
                    {termGroup.sections.map((section) => (
                        <div key={section.title} className={signupTermGroupStyles.section}>
                            <h4 className={signupTermGroupStyles.sectionTitle}>{section.title}</h4>
                            {section.content.map((text) => (
                                <p key={text} className={signupTermGroupStyles.sectionText}>
                                    {text}
                                </p>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}