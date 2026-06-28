import { useState } from "react";
import Reveal from "./Reveal";
import type { Video } from "../../types";

interface VideoCardProps {
    video: Video;
    index: number;
    onClick?: (video: Video) => void;
}

export default function VideoCard({ video, index, onClick }: VideoCardProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <Reveal direction="up" delay={index * 50}>
            <div
                className="group rounded-xl overflow-hidden cursor-pointer"
                style={{
                    background: "var(--color-surface)",
                    border: `1px solid ${hovered ? "var(--color-border-accent)" : "var(--color-border)"}`,
                    boxShadow: hovered ? "var(--shadow-lg)" : "var(--shadow-card)",
                    transform: hovered ? "translateY(-4px)" : "translateY(0)",
                    transition: "all 300ms ease-out",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => onClick?.(video)}
            >
                {/* thumbnail area */}
                <div className="relative overflow-hidden" style={{ height: "160px" }}>
                    <img
                        src={video.thumbnail_url}
                        alt={video.title_en}
                        className="w-full h-full object-cover"
                        style={{
                            transform: hovered ? "scale(1.05)" : "scale(1)",
                            transition: "transform 700ms ease-out",
                        }}
                    />

                    {/* duration badge */}
                    {video.duration && (
                        <span
                            className="absolute bottom-2 right-2 rounded-md font-semibold"
                            style={{
                                background: "rgba(0,0,0,0.70)",
                                color: "#fff",
                                fontSize: "10px",
                                padding: "2px 6px",
                                fontFamily: '"Fredoka", sans-serif',
                            }}
                        >
                            {video.duration}
                        </span>
                    )}

                    {/* play overlay */}
                    <div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        style={{
                            opacity: hovered ? 1 : 0,
                            transition: "opacity 200ms ease-out",
                        }}
                    >
                        <div
                            className="flex items-center justify-center"
                            style={{
                                width: "48px",
                                height: "48px",
                                borderRadius: "9999px",
                                background: "rgba(255,255,255,0.85)",
                                transform: hovered ? "scale(1)" : "scale(0.8)",
                                transition: "transform 200ms ease-out",
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                                <path d="M6.5 4.5l8 4.5-8 4.5V4.5z" fill="var(--color-primary-deep)" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* info area */}
                <div className="p-4">
                    <p
                        className="line-clamp-2 leading-snug"
                        style={{
                            fontFamily: '"Fredoka", sans-serif',
                            fontWeight: 500,
                            fontSize: "0.875rem",
                            color: "var(--color-text-primary)",
                        }}
                    >
                        {video.title_en}
                    </p>
                    {video.upload_date && (
                        <p
                            className="mt-1.5"
                            style={{
                                fontFamily: '"Fredoka", sans-serif',
                                fontWeight: 400,
                                fontSize: "0.75rem",
                                color: "var(--color-text-tertiary)",
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
            </div>
        </Reveal>
    );
}