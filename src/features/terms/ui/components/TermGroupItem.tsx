"use client";

import { useState } from "react";
import type { TermGroup } from "@/features/terms/domain/model/termSection";
import { termGroupStyles } from "@/ui/styles/termsPageStyles";

interface TermGroupItemProps {
  termGroup: TermGroup;
  checked: boolean;
  onToggle: () => void;
}

export default function TermGroupItem({ termGroup, checked, onToggle }: TermGroupItemProps) {
  const [expanded, setExpanded] = useState(false); // 약관 내용 펼침 여부

  return (
    <div className={termGroupStyles.container}>
      <div className={termGroupStyles.header}>
        <label className={termGroupStyles.checkboxLabel}>
          <input
            type="checkbox"
            checked={checked}
            onChange={onToggle}
            className={termGroupStyles.checkbox}
          />
          <span className={termGroupStyles.name}>{termGroup.name}</span>
          <span
            className={
              termGroup.required
                ? termGroupStyles.requiredBadge
                : termGroupStyles.optionalBadge
            }
          >
            {termGroup.required ? "필수" : "선택"}
          </span>
        </label>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className={termGroupStyles.toggleButton}
        >
          {expanded ? "접기" : "내용 보기"}
        </button>
      </div>
      {expanded && (
        <div className={termGroupStyles.content}>
          {termGroup.sections.map((section) => (
            <div key={section.title} className={termGroupStyles.section}>
              <h4 className={termGroupStyles.sectionTitle}>{section.title}</h4>
              {section.content.map((text) => (
                <p key={text} className={termGroupStyles.sectionText}>
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
