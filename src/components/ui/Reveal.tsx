import type { ReactNode } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

interface RevealProps {
    children: ReactNode;
    direction?: "up" | "down" | "left" | "right" | "none";
    delay?: number;
    threshold?: number;
    className?: string;
}

export default function Reveal({
    children,
    direction = "up",
    delay = 0,
    threshold = 0.15,
    className = "",
}: RevealProps) {
    const { ref, isVisible } = useScrollReveal({ threshold });

    const hiddenState = {
        up: "translate-y-8",
        down: "-translate-y-8",
        left: "-translate-x-12",
        right: "translate-x-12",
        none: "scale-[0.97]",
    };

    return (
        <div
            ref={ref as React.RefObject<HTMLDivElement>}
            className={[
                "transition-all duration-700 ease-out",
                isVisible
                    ? "opacity-100 translate-x-0 translate-y-0 scale-100"
                    : `opacity-0 ${hiddenState[direction]}`,
                className,
            ].join(" ")}
            style={{
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}