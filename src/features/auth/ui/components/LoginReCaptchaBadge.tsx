"use client";

import { useEffect } from "react";

function setBadgeVisibility(visibility: "visible" | "hidden") {
    document
        .querySelectorAll<HTMLElement>(".grecaptcha-badge")
        .forEach((badge) => {
            badge.style.visibility = visibility;
        });
}

export default function LoginReCaptchaBadge() {
    useEffect(() => {
        const showBadge = () => {
            setBadgeVisibility("visible");
        };

        showBadge();

        const observer = new MutationObserver(showBadge);

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            observer.disconnect();
            setBadgeVisibility("hidden");
        };
    }, []);

    return null;
}