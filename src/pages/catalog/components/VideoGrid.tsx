import { useParams, useNavigate } from "react-router-dom";
import VideoCard from "../../../components/ui/VideoCard";
import { useVideos } from "../../../hooks/useVideos";

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
                className="animate-pulse"
                style={{ height: "160px", background: "var(--color-bg-alt)" }}
            />
            <div className="p-4 flex flex-col gap-2">
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

    const { videos, loading, error, playlistName } = useVideos(playlistId ?? "");

    // back label derived from category slug
    const categoryLabel =
        categorySlug === "music"
            ? "music"
            : categorySlug === "variety"
                ? "variety & guestings"
                : "official content";

    const backPath = categorySlug === "official-content"
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
                onMouseEnter={e =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--color-primary)")
                }
                onMouseLeave={e =>
                ((e.currentTarget as HTMLElement).style.color =
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
                            style={{ background: "var(--color-bg-alt)", width: "280px" }}
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
                    ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
                    : videos.map((video, index) => (
                        <VideoCard
                            key={video.id}
                            video={video}
                            index={index}
                            onClick={() => {
                                // wired to player in phase 12
                            }}
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