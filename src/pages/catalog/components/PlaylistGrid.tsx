import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Reveal from "../../../components/ui/Reveal";
import { usePlaylists } from "../../../hooks/usePlaylists";
import type { Playlist } from "../../../types";

// ─── shimmer skeleton ─────────────────────────────────────────────────────────

function SkeletonCard() {
    return (
        <div
            className="rounded-xl overflow-hidden"
            style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-card)",
            }}
        >
            <div
                className="h-[140px] animate-pulse"
                style={{ background: "var(--color-bg-alt)" }}
            />
            <div className="p-4 flex flex-col gap-2">
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
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate();

    const hasThumbnail = !!playlist.thumbnail_url;

    const handleClick = () => {
        navigate(`/catalog/${categorySlug}/${playlist.id}`);
    };

    return (
        <Reveal direction="up" delay={index * 60}>
            <div
                className="rounded-xl overflow-hidden cursor-pointer"
                style={{
                    background: "var(--color-surface)",
                    border: `1px solid ${hovered ? "var(--color-border-accent)" : "var(--color-border)"}`,
                    boxShadow: hovered ? "var(--shadow-lg)" : "var(--shadow-card)",
                    transform: hovered ? "translateY(-4px)" : "translateY(0)",
                    transition: "all 300ms ease-out",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={handleClick}
            >
                {/* thumbnail region */}
                <div
                    className="relative overflow-hidden"
                    style={{ height: "140px", background: "var(--color-bg-alt)" }}
                >
                    {hasThumbnail ? (
                        <img
                            src={playlist.thumbnail_url!}
                            alt={playlist.name}
                            className="w-full h-full object-cover"
                            style={{
                                transform: hovered ? "scale(1.05)" : "scale(1)",
                                transition: "transform 700ms ease-out",
                            }}
                        />
                    ) : (
                        // gradient placeholder
                        <div
                            className="w-full h-full flex items-center justify-center"
                            style={{
                                background:
                                    "linear-gradient(135deg, var(--color-primary-soft), var(--color-bg-alt))",
                            }}
                        >
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                aria-hidden="true"
                                style={{ opacity: 0.4 }}
                            >
                                <rect x="2" y="6" width="28" height="20" rx="3" stroke="var(--color-primary)" strokeWidth="2" />
                                <path d="M13 11l8 5-8 5V11z" fill="var(--color-primary)" />
                            </svg>
                        </div>
                    )}

                    {/* subtle bottom fade */}
                    <div
                        className="absolute inset-x-0 bottom-0 h-8 pointer-events-none"
                        style={{
                            background:
                                "linear-gradient(to top, var(--color-surface), transparent)",
                        }}
                    />
                </div>

                {/* card body */}
                <div className="p-4 flex items-start justify-between gap-3">
                    <p
                        className="leading-snug"
                        style={{
                            fontFamily: '"Fredoka", sans-serif',
                            fontWeight: 600,
                            fontSize: "1rem",
                            color: "var(--color-text-heading)",
                        }}
                    >
                        {playlist.name}
                    </p>

                    {playlist.video_count !== undefined && (
                        <span
                            className="shrink-0 rounded-full"
                            style={{
                                fontFamily: '"Fredoka", sans-serif',
                                fontWeight: 500,
                                fontSize: "0.75rem",
                                background: "var(--color-primary-muted)",
                                color: "var(--color-primary-deep)",
                                padding: "2px 10px",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {playlist.video_count} videos
                        </span>
                    )}
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
        <div style={{ maxWidth: "85%", margin: "0 auto", paddingTop: "2rem", paddingBottom: "2rem" }}>
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