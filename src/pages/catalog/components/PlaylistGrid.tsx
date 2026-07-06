import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Reveal from "../../../components/ui/Reveal";
import { usePlaylists } from "../../../hooks/usePlaylists";
import type { Playlist } from "../../../types";

const CATEGORY_ACCENTS: Record<string, string> = {
    "official-content": "#7EC8E3",
    music: "#C3B1E1",
    variety: "#A8E6CF",
};

// ─── perforated tear-line ─────────────────────────────────────────────────────
function Perforation() {
    return (
        <div
            aria-hidden="true"
            style={{
                height: "14px",
                flexShrink: 0,
                backgroundImage:
                    "radial-gradient(circle at 10px 7px, transparent 5.5px, var(--color-surface) 6px)",
                backgroundSize: "18px 14px",
                backgroundRepeat: "repeat-x",
            }}
        />
    );
}

// ─── shimmer skeleton ─────────────────────────────────────────────────────────

function SkeletonCard() {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div
                className="animate-pulse"
                style={{
                    height: "150px",
                    borderRadius: "18px 18px 0 0",
                    background: "var(--color-bg-alt)",
                }}
            />
            <Perforation />
            <div
                className="flex flex-col gap-2"
                style={{
                    background: "var(--color-surface)",
                    borderRadius: "0 0 18px 18px",
                    padding: "12px 16px 16px",
                }}
            >
                <div
                    className="h-4 rounded-full animate-pulse"
                    style={{ background: "var(--color-bg-alt)", width: "70%" }}
                />
                <div
                    className="h-3 rounded-full animate-pulse"
                    style={{ background: "var(--color-bg-alt)", width: "30%" }}
                />
            </div>
        </div>
    );
}

// ─── playlist card ────────────────────────────────────────────────────────────

interface PlaylistCardProps {
    playlist: Playlist;
    index: number;
    categorySlug: string;
}

function PlaylistCard({ playlist, index, categorySlug }: PlaylistCardProps) {
    const [active, setActive] = useState(false); // true on hover OR keyboard focus
    const navigate = useNavigate();

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

    const hasThumbnail = !!playlist.thumbnail_url;
    const accent = CATEGORY_ACCENTS[categorySlug] ?? CATEGORY_ACCENTS["official-content"];

    const handleClick = () => {
        navigate(`/catalog/${categorySlug}/${playlist.id}`);
    };

    const motionOn = active && !prefersReducedMotion;

    return (
        <Reveal direction="up" delay={index * 60}>
            <div
                role="button"
                tabIndex={0}
                aria-label={`Open playlist ${playlist.name}`}
                onClick={handleClick}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleClick();
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
                    {hasThumbnail ? (
                        <img
                            src={playlist.thumbnail_url!}
                            alt={playlist.name}
                            className="w-full h-full object-cover"
                            style={{
                                filter: active
                                    ? "saturate(1.15) brightness(1.02)"
                                    : "saturate(0.82) brightness(0.98)",
                                transform: motionOn ? "scale(1.04)" : "scale(1)",
                                transition: "filter 420ms ease-out, transform 420ms ease-out",
                            }}
                        />
                    ) : (
                        <div
                            className="w-full h-full flex items-center justify-center"
                            style={{
                                background: `linear-gradient(135deg, ${accent}33, var(--color-bg-alt))`,
                            }}
                        >
                            <div
                                style={{
                                    width: "42px",
                                    height: "42px",
                                    borderRadius: "50%",
                                    border: `2px dashed ${accent}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                    <path d="M4 2l8 5-8 5V2z" fill={accent} />
                                </svg>
                            </div>
                        </div>
                    )}
                </div>

                <Perforation />

                {/* info panel */}
                <div
                    style={{
                        background: "var(--color-surface)",
                        borderRadius: "0 0 18px 18px",
                        padding: "12px 16px 16px",
                    }}
                >
                    <div className="flex items-start justify-between gap-3">
                        <p
                            style={{
                                fontFamily: '"Fredoka", sans-serif',
                                fontWeight: 600,
                                fontSize: "1rem",
                                lineHeight: 1.3,
                                color: "var(--color-text-heading)",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                            }}
                        >
                            {playlist.name}
                        </p>

                        {playlist.video_count !== undefined && (
                            <span
                                className="shrink-0"
                                style={{
                                    fontFamily: '"Fredoka", sans-serif',
                                    fontWeight: 500,
                                    fontSize: "0.7rem",
                                    color: "var(--color-text-secondary)",
                                    background: `${accent}30`,
                                    borderRadius: "999px",
                                    padding: "3px 10px",
                                    whiteSpace: "nowrap",
                                    transform: "rotate(-4deg)",
                                    marginTop: "2px",
                                }}
                            >
                                {playlist.video_count} videos
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Reveal>
    );
}

// ─── main component ───────────────────────────────────────────────────────────

export default function PlaylistGrid() {
    const { pathname } = useLocation();

    // derive category slug from current route
    const categorySlug = pathname.startsWith("/catalog/music")
        ? "music"
        : pathname.startsWith("/catalog/variety")
            ? "variety"
            : "official-content";

    const { playlists, loading, error } = usePlaylists(categorySlug);

    if (error) {
        return (
            <div
                className="text-center py-16"
                style={{
                    fontFamily: '"Fredoka", sans-serif',
                    color: "var(--color-text-secondary)",
                }}
            >
                something went wrong loading playlists.
            </div>
        );
    }

    return (
        <div style={{ maxWidth: "80%", margin: "0 auto", paddingTop: "2rem", paddingBottom: "2rem" }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading
                    ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                    : playlists.map((playlist, index) => (
                        <PlaylistCard
                            key={playlist.id}
                            playlist={playlist}
                            index={index}
                            categorySlug={categorySlug}
                        />
                    ))}
            </div>
        </div>
    );
}