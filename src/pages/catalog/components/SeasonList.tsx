import { useState } from "react";
import Reveal from "../../../components/ui/Reveal";
import Modal from "../../../components/ui/Modal";
import VideoCard from "../../../components/ui/VideoCard";
import { useVideos } from "../../../hooks/useVideos";
import { useSeasons } from "../../../hooks/useSeasons";
import type { Playlist } from "../../../types";

// ─── season modal content ─────────────────────────────────────────────────────

interface SeasonModalProps {
    playlistId: string;
    season: number;
}

function SeasonModalContent({ playlistId, season }: SeasonModalProps) {
    const { videos, loading, error } = useVideos(playlistId, season);

    if (loading) {
        return (
            <div className="flex flex-col gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="rounded-xl overflow-hidden flex gap-3"
                        style={{
                            background: "var(--color-surface)",
                            border: "1px solid var(--color-border)",
                            padding: "0.75rem",
                        }}
                    >
                        <div
                            className="shrink-0 rounded-lg animate-pulse"
                            style={{ width: "120px", height: "68px", background: "var(--color-bg-alt)" }}
                        />
                        <div className="flex flex-col gap-2 flex-1 justify-center">
                            <div
                                className="h-3.5 rounded-full animate-pulse"
                                style={{ background: "var(--color-bg-alt)", width: "80%" }}
                            />
                            <div
                                className="h-3 rounded-full animate-pulse"
                                style={{ background: "var(--color-bg-alt)", width: "40%" }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <p style={{ fontFamily: '"Fredoka", sans-serif', color: "var(--color-text-secondary)" }}>
                something went wrong loading videos.
            </p>
        );
    }

    if (videos.length === 0) {
        return (
            <p style={{ fontFamily: '"Fredoka", sans-serif', color: "var(--color-text-secondary)" }}>
                no videos in this season yet.
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {videos.map((video, index) => (
                <VideoCard key={video.id} video={video} index={index} />
            ))}
        </div>
    );
}

// ─── season card ──────────────────────────────────────────────────────────────

interface SeasonCardProps {
    season: number;
    videoCount: number;
    playlistId: string;
    index: number;
}

function SeasonCard({ season, videoCount, playlistId, index }: SeasonCardProps) {
    const [hovered, setHovered] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Reveal direction="up" delay={index * 60}>
                <div
                    className="rounded-xl cursor-pointer"
                    style={{
                        background: "var(--color-surface)",
                        border: `1px solid ${hovered ? "var(--color-border-accent)" : "var(--color-border)"}`,
                        boxShadow: hovered ? "var(--shadow-lg)" : "var(--shadow-card)",
                        transform: hovered ? "translateY(-4px)" : "translateY(0)",
                        transition: "all 300ms ease-out",
                        padding: "1.5rem",
                    }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onClick={() => setModalOpen(true)}
                >
                    <div className="flex items-center justify-between gap-4">
                        {/* season badge + label */}
                        <div className="flex items-center gap-3">
                            <div
                                className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
                                style={{
                                    background: "var(--color-primary-muted)",
                                    fontFamily: '"Fredoka", sans-serif',
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                    color: "var(--color-primary-deep)",
                                }}
                            >
                                {season}
                            </div>
                            <p
                                style={{
                                    fontFamily: '"Fredoka", sans-serif',
                                    fontWeight: 600,
                                    fontSize: "1rem",
                                    color: "var(--color-text-heading)",
                                }}
                            >
                                season {season}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* video count badge */}
                            <span
                                style={{
                                    fontFamily: '"Fredoka", sans-serif',
                                    fontWeight: 500,
                                    fontSize: "0.75rem",
                                    background: "var(--color-primary-muted)",
                                    color: "var(--color-primary-deep)",
                                    borderRadius: "9999px",
                                    padding: "2px 10px",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {videoCount} videos
                            </span>

                            {/* chevron */}
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                aria-hidden="true"
                                style={{
                                    color: "var(--color-text-tertiary)",
                                    transform: hovered ? "translateX(2px)" : "translateX(0)",
                                    transition: "transform 200ms ease-out",
                                }}
                            >
                                <path
                                    d="M6 3l5 5-5 5"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </Reveal>

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={`season ${season}`}
            >
                <SeasonModalContent playlistId={playlistId} season={season} />
            </Modal>
        </>
    );
}

// ─── main component ───────────────────────────────────────────────────────────

interface SeasonListProps {
    playlist: Playlist;
}

export default function SeasonList({ playlist }: SeasonListProps) {
    const { seasons, loading, error } = useSeasons(playlist.id);

    if (loading) {
        return (
            <div
                style={{
                    maxWidth: "85%",
                    margin: "0 auto",
                    paddingTop: "2rem",
                    paddingBottom: "2rem",
                }}
            >
                <h2
                    className="mb-8"
                    style={{
                        fontFamily: '"Fredoka", sans-serif',
                        fontWeight: 700,
                        fontSize: "1.5rem",
                        color: "var(--color-text-heading)",
                    }}
                >
                    {playlist.name}
                </h2>

                <div className="flex flex-col gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-xl animate-pulse"
                            style={{
                                height: "76px",
                                background: "var(--color-bg-alt)",
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="text-center py-16"
                style={{
                    fontFamily: '"Fredoka", sans-serif',
                    color: "var(--color-text-secondary)",
                }}
            >
                something went wrong loading seasons.
            </div>
        );
    }

    return (
        <div
            style={{
                maxWidth: "85%",
                margin: "0 auto",
                paddingTop: "2rem",
                paddingBottom: "2rem",
            }}
        >
            <h2
                className="mb-8"
                style={{
                    fontFamily: '"Fredoka", sans-serif',
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    color: "var(--color-text-heading)",
                }}
            >
                {playlist.name}
            </h2>

            <div className="flex flex-col gap-4">
                {seasons.map((season, index) => (
                    <SeasonCard
                        key={season.season}
                        season={season.season}
                        videoCount={season.videoCount}
                        playlistId={playlist.id}
                        index={index}
                    />
                ))}
            </div>

            {!loading && seasons.length === 0 && (
                <div
                    className="text-center py-16"
                    style={{
                        fontFamily: '"Fredoka", sans-serif',
                        color: "var(--color-text-secondary)",
                    }}
                >
                    no seasons found.
                </div>
            )}
        </div>
    );
}