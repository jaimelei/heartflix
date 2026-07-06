import { useParams, useNavigate } from "react-router-dom";
import VideoCard from "../../../components/ui/VideoCard";
import Perforation from "../../../components/ui/Perforation";
import { useVideos } from "../../../hooks/useVideos";
import { useVideoPlayer } from "../../../hooks/useVideoPlayer";

// ─── shimmer skeleton ─────────────────────────────────────────────────────────
// Mirrors the ticket-stub silhouette (image / tear-line / label) so loading
// and loaded states share the same shape.

function SkeletonCard() {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div
                className="animate-pulse"
                style={{
                    height: "160px",
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
                    style={{ background: "var(--color-bg-alt)", width: "85%" }}
                />
                <div
                    className="h-4 rounded-full animate-pulse"
                    style={{ background: "var(--color-bg-alt)", width: "60%" }}
                />
                <div
                    className="h-3 rounded-full animate-pulse mt-1"
                    style={{ background: "var(--color-bg-alt)", width: "35%" }}
                />
            </div>
        </div>
    );
}

// ─── component ────────────────────────────────────────────────────────────────

export default function VideoGrid() {
    const { categorySlug, playlistId } = useParams<{
        categorySlug: string;
        playlistId: string;
    }>();

    const navigate = useNavigate();

    const { playVideo } = useVideoPlayer();

    const { videos, loading, error, playlistName } = useVideos(
        playlistId ?? ""
    );

    const categoryLabel =
        categorySlug === "music"
            ? "music"
            : categorySlug === "variety"
                ? "variety & guestings"
                : "official content";

    const backPath =
        categorySlug === "official-content"
            ? "/catalog"
            : `/catalog/${categorySlug}`;

    if (error) {
        return (
            <div
                className="text-center py-16"
                style={{
                    fontFamily: '"Fredoka", sans-serif',
                    color: "var(--color-text-secondary)",
                }}
            >
                something went wrong loading videos.
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
            {/* back button */}
            <button
                onClick={() => navigate(backPath)}
                className="flex items-center gap-2 mb-6 transition-colors duration-200"
                style={{
                    fontFamily: '"Fredoka", sans-serif',
                    fontWeight: 500,
                    fontSize: "0.9375rem",
                    color: "var(--color-text-secondary)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                }}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-primary)")
                }
                onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                    "var(--color-text-secondary)")
                }
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="M10 3L5 8l5 5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                back to {categoryLabel}
            </button>

            {/* playlist title */}
            {(loading || playlistName) && (
                <div className="mb-8">
                    {loading ? (
                        <div
                            className="h-8 rounded-full animate-pulse"
                            style={{
                                background: "var(--color-bg-alt)",
                                width: "280px",
                            }}
                        />
                    ) : (
                        <h2
                            style={{
                                fontFamily: '"Fredoka", sans-serif',
                                fontWeight: 700,
                                fontSize: "1.5rem",
                                color: "var(--color-text-heading)",
                            }}
                        >
                            {playlistName}
                        </h2>
                    )}
                </div>
            )}

            {/* video grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading
                    ? Array.from({ length: 12 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))
                    : videos.map((video, index) => (
                        <VideoCard
                            key={video.id}
                            video={video}
                            index={index}
                            categorySlug={categorySlug ?? "official-content"}
                            onClick={playVideo}
                        />
                    ))}
            </div>

            {!loading && videos.length === 0 && (
                <div
                    className="text-center py-16"
                    style={{
                        fontFamily: '"Fredoka", sans-serif',
                        color: "var(--color-text-secondary)",
                    }}
                >
                    no videos in this playlist yet.
                </div>
            )}
        </div>
    );
}