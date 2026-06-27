import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
    threshold?: number;
}

export function useScrollReveal({
    threshold = 0.15,
}: UseScrollRevealOptions = {}) {
    const ref = useRef<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if (!element || isVisible) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    return;
                }

                setIsVisible(true);
                observer.disconnect();
            },
            {
                threshold,
            },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [threshold, isVisible]);

    return {
        ref,
        isVisible,
    };
}