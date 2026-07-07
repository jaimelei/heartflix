import { useState } from "react";
import Reveal from "./Reveal";
import Perforation from "./Perforation";
import { CATEGORY_ACCENTS } from "./catalogAccents";
import type { Video } from "../../types";

interface VideoCardProps {
    video: Video;
    index: number;
    categorySlug?: string;
    onClick?: (video: Video) => void;
}

export default function VideoCard({ video, index, categorySlug, onClick }: VideoCardProps) {
    const [active, setActive] = useState(false); // true on hover OR keyboard focus

    // Respect prefers-reduced-motion: keep the shadow/color feedback, drop the
    // lift, tilt, and scale.
    const [prefersReducedMotion] = useState(() => {
        if (typeof window === "undefined" || !window.matchMedia) return false;
        try {
            return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        } catch {
            return false;
        }
    });

    const accent = (categorySlug && CATEGORY_ACCENTS[categorySlug]) ?? CATEGORY_ACCENTS["official-content"];
    const motionOn = active && !prefersReducedMotion;

    return (
        <Reveal direction="up" delay={index * 50}>
            <div
                role="button"
                tabIndex={0}
                aria-label={`Play ${video.title_en}`}
                onClick={() => onClick?.(video)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onClick?.(video);
                    }
                }}
                onMouseEnter={() => setActive(true)}
                onMouseLeave={() => setActive(false)}
                onFocus={() => setActive(true)}
                onBlur={() => setActive(false)}
                style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    gap: motionOn ? "6px" : "0px",
                    borderRadius: "18px",
                    cursor: "pointer",
                    outline: "none",
                    boxShadow: active ? `7px 7px 0px 0px ${accent}` : `4px 4px 0px 0px ${accent}`,
                    transform: motionOn
                        ? "translate(-3px, -3px) rotate(-1.2deg)"
                        : "translate(0px, 0px) rotate(0deg)",
                    transition:
                        "gap 260ms ease-out, box-shadow 260ms ease-out, transform 260ms ease-out",
                }}
            >
                {/* thumbnail */}
                <div
                    style={{
                        position: "relative",
                        height: "180px",
                        overflow: "hidden",
                        borderRadius: "18px 18px 0 0",
                        background: "var(--color-surface)",
                    }}
                >
                    <img
                        src={video.thumbnail_url}
                        alt={video.title_en}
                        className="w-full h-full object-cover"
                        style={{
                            filter: active
                                ? "saturate(1.15) brightness(1.02)"
                                : "saturate(0.82) brightness(0.98)",
                            transform: motionOn ? "scale(1.04)" : "scale(1)",
                            transition: "filter 420ms ease-out, transform 420ms ease-out",
                        }}
                    />

                    {/* duration stamp */}
                    {video.duration && (
                        <span
                            className="absolute bottom-2 right-2 font-semibold"
                            style={{
                                background: accent,
                                color: "#1f2937",
                                fontSize: "0.7rem",
                                padding: "3px 8px",
                                borderRadius: "7px",
                                fontFamily: '"Fredoka", sans-serif',
                                transform: "rotate(-4deg)",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
                            }}
                        >
                            {video.duration}
                        </span>
                    )}
                </div>

                <div style={{ position: "relative" }}>
                    <Perforation />
                </div>

                {/* info panel */}
                <div
                    style={{
                        background: "var(--color-surface)",
                        borderRadius: "0 0 18px 18px",
                        padding: "12px 16px 16px",
                    }}
                >
                    <p
                        className="line-clamp-2"
                        style={{
                            fontFamily: '"Fredoka", sans-serif',
                            fontWeight: 500,
                            fontSize: "0.875rem",
                            lineHeight: 1.35,
                            color: "var(--color-text-primary)",
                        }}
                    >
                        {video.title_en}
                    </p>
                    {video.upload_date && (
                        <p
                            style={{
                                fontFamily: '"Fredoka", sans-serif',
                                fontWeight: 400,
                                fontSize: "0.75rem",
                                color: "var(--color-text-tertiary)",
                                marginTop: "6px",
                            }}
                        >
                            {new Date(video.upload_date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </p>
                    )}
                </div>

                {/* play badge — pinned to the card's own corner, not the strip */}
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        bottom: "-10px",
                        right: "-10px",
                        width: "34px",
                        height: "34px",
                        borderRadius: "50%",
                        background: accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.25)",
                        transform: motionOn ? "scale(1.08)" : "scale(1)",
                        transition: "transform 220ms ease-out",
                    }}
                >
                    <svg width="12" height="12" viewBox="0 0 10 10" fill="#1f2937" aria-hidden="true">
                        <path d="M1 0.5l8 4.5-8 4.5V0.5z" />
                    </svg>
                </div>
            </div>
        </Reveal>
    );
}