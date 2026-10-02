"use client";

import { useEffect } from "react";

const SCROLL_REVEAL_SELECTOR = "[data-scroll-reveal]";
const SCROLL_REVEAL_THRESHOLD = 0.12;

export function usePublicHomeScrollReveal(
    enabled: boolean,
) {
    useEffect(() => {
        if (!enabled) {
            return;
        }

        const elements =
            document.querySelectorAll<HTMLElement>(
                SCROLL_REVEAL_SELECTOR,
            );

        if (
            window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches
        ) {
            elements.forEach((element) => {
                element.dataset.revealed = "true";
            });

            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    const element = entry.target as HTMLElement;

                    element.dataset.revealed = "true";

                    observer.unobserve(element);
                });
            },
            {
                threshold: SCROLL_REVEAL_THRESHOLD,
                rootMargin: "0px 0px -40px 0px",
            },
        );

        elements.forEach((element) => {
            observer.observe(element);
        });

        return () => {
            observer.disconnect();
        };
    }, [enabled]);
}