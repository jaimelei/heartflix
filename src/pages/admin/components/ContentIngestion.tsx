import { useState } from "react";
import { useAdminPlaylists } from "../../../hooks/useAdminPlaylists";

type FetchMode = "single" | "playlist";

interface FetchedVideo {
    youtube_id: string;
    title_en: string;
    title_ko: string | null;
    duration: string | null;
    thumbnail_url: string;
    upload_date: string | null;
}

export default function ContentIngestion() {
    const { playlists } = useAdminPlaylists();

    const [mode, setMode] = useState<FetchMode>("single");

    const [url, setUrl] = useState("");

    const [videos, setVideos] = useState<FetchedVideo[]>([]);

    const [playlistId, setPlaylistId] = useState("");
    const [season, setSeason] = useState("");

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const selectedPlaylist = playlists.find(
        (playlist) => playlist.id === playlistId
    );

    async function fetchContent() {
        if (!url.trim()) {
            setError("Please enter a YouTube URL.");
            return;
        }

        setLoading(true);
        setError("");
        setVideos([]);

        try {
            const response = await fetch(
                mode === "single"
                    ? "/api/fetch-video"
                    : "/api/fetch-playlist",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        url,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.error ?? "Unable to fetch content.");
                return;
            }

            setVideos(mode === "single" ? [data] : data);
        } catch {
            setError("Unable to reach the server.");
        } finally {
            setLoading(false);
        }
    }

    async function saveVideos() {
        if (!playlistId) {
            setError("Please choose a playlist.");
            return;
        }

        if (!selectedPlaylist) {
            setError("Invalid playlist.");
            return;
        }

        if (videos.length === 0) {
            setError("Nothing to ingest.");
            return;
        }

        setSaving(true);
        setError("");

        try {
            const response = await fetch("/api/ingest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    videos: videos.map((video) => ({
                        ...video,
                        category_id: selectedPlaylist.category_id,
                        playlist_id: playlistId,
                        season:
                            season === ""
                                ? null
                                : Number(season),
                    })),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error ?? "Unable to ingest videos.");
                return;
            }

            alert(
                `${data.processed} video${data.processed === 1 ? "" : "s"
                } processed successfully.`
            );

            setUrl("");
            setVideos([]);
            setSeason("");
        } catch {
            setError("Unable to reach the server.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div
            className="mx-auto w-full max-w-6xl rounded-2xl p-8"
            style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-card)",
            }}
        >
            <h2
                className="mb-8"
                style={{
                    fontFamily: '"Fredoka", sans-serif',
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "var(--color-text-heading)",
                }}
            >
                content ingestion
            </h2>

            <div className="mb-8 flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        checked={mode === "single"}
                        onChange={() => setMode("single")}
                    />
                    Single Video
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        checked={mode === "playlist"}
                        onChange={() => setMode("playlist")}
                    />
                    Playlist
                </label>
            </div>

            <div className="flex gap-4 mb-8">
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={
                        mode === "single"
                            ? "Paste a YouTube video URL..."
                            : "Paste a YouTube playlist URL..."
                    }
                    className="flex-1 rounded-xl px-4 py-3"
                    style={{
                        background: "var(--color-bg)",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-text-primary)",
                    }}
                />

                <button
                    onClick={fetchContent}
                    disabled={loading}
                    className="rounded-xl px-6"
                    style={{
                        background: "var(--color-primary)",
                        color: "#fff",
                    }}
                >
                    {loading ? "Fetching..." : "Fetch"}
                </button>
            </div>

            {error && (
                <p
                    className="mb-8"
                    style={{
                        color: "#ef4444",
                    }}
                >
                    {error}
                </p>
            )}
            {videos.length > 0 && (
                <>
                    <div className="mb-10">
                        <h3
                            className="mb-4"
                            style={{
                                fontFamily: '"Fredoka", sans-serif',
                                fontWeight: 600,
                                fontSize: "1.125rem",
                                color: "var(--color-text-heading)",
                            }}
                        >
                            Preview ({videos.length})
                        </h3>

                        {mode === "single" ? (
                            <div
                                className="flex gap-5 rounded-xl p-4"
                                style={{
                                    background: "var(--color-bg)",
                                    border: "1px solid var(--color-border)",
                                }}
                            >
                                <img
                                    src={videos[0].thumbnail_url}
                                    alt={videos[0].title_en}
                                    className="h-32 w-56 rounded-lg object-cover"
                                />

                                <div className="flex-1">
                                    <h4
                                        style={{
                                            fontFamily:
                                                '"Fredoka", sans-serif',
                                            fontWeight: 600,
                                            fontSize: "1rem",
                                            color:
                                                "var(--color-text-heading)",
                                        }}
                                    >
                                        {videos[0].title_en}
                                    </h4>

                                    {videos[0].title_ko &&
                                        videos[0].title_ko !==
                                        videos[0].title_en && (
                                            <p
                                                className="mt-2"
                                                style={{
                                                    color: "var(--color-text-secondary)",
                                                }}
                                            >
                                                {videos[0].title_ko}
                                            </p>
                                        )}

                                    <div
                                        className="mt-4 flex gap-6 text-sm"
                                        style={{
                                            color:
                                                "var(--color-text-tertiary)",
                                        }}
                                    >
                                        <span>
                                            {videos[0].duration ?? "—"}
                                        </span>

                                        <span>
                                            {videos[0].upload_date
                                                ? new Date(
                                                    videos[0].upload_date
                                                ).toLocaleDateString()
                                                : "—"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="overflow-hidden rounded-xl"
                                style={{
                                    border:
                                        "1px solid var(--color-border)",
                                }}
                            >
                                <div
                                    className="max-h-[500px] overflow-y-auto"
                                    style={{
                                        background:
                                            "var(--color-surface)",
                                    }}
                                >
                                    <table className="w-full">
                                        <thead
                                            style={{
                                                background:
                                                    "var(--color-bg-alt)",
                                            }}
                                        >
                                            <tr>
                                                <th className="p-3 text-left">
                                                    Thumbnail
                                                </th>

                                                <th className="p-3 text-left">
                                                    Title
                                                </th>

                                                <th className="p-3 text-left">
                                                    Duration
                                                </th>

                                                <th className="p-3 text-left">
                                                    Upload Date
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {videos.map((video) => (
                                                <tr
                                                    key={video.youtube_id}
                                                    style={{
                                                        borderTop:
                                                            "1px solid var(--color-border)",
                                                    }}
                                                >
                                                    <td className="p-3">
                                                        <img
                                                            src={
                                                                video.thumbnail_url
                                                            }
                                                            alt={
                                                                video.title_en
                                                            }
                                                            className="h-16 w-28 rounded object-cover"
                                                        />
                                                    </td>

                                                    <td className="p-3">
                                                        <div
                                                            style={{
                                                                fontWeight: 500,
                                                            }}
                                                        >
                                                            {video.title_en}
                                                        </div>

                                                        {video.title_ko &&
                                                            video.title_ko !==
                                                            video.title_en && (
                                                                <div
                                                                    className="mt-1 text-sm"
                                                                    style={{
                                                                        color: "var(--color-text-secondary)",
                                                                    }}
                                                                >
                                                                    {
                                                                        video.title_ko
                                                                    }
                                                                </div>
                                                            )}
                                                    </td>

                                                    <td className="p-3">
                                                        {video.duration ??
                                                            "—"}
                                                    </td>

                                                    <td className="p-3">
                                                        {video.upload_date
                                                            ? new Date(
                                                                video.upload_date
                                                            ).toLocaleDateString()
                                                            : "—"}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div>
                            <label
                                className="mb-2 block"
                                style={{
                                    fontWeight: 500,
                                }}
                            >
                                Category
                            </label>

                            <input
                                readOnly
                                value={
                                    selectedPlaylist?.category?.name ??
                                    "Select a playlist first"
                                }
                                className="w-full rounded-xl px-4 py-3"
                                style={{
                                    background: "var(--color-bg-alt)",
                                    border: "1px solid var(--color-border)",
                                    color: "var(--color-text-secondary)",
                                }}
                            />
                        </div>
                        <div>
                            <label
                                className="mb-2 block"
                                style={{
                                    fontWeight: 500,
                                }}
                            >
                                Playlist
                            </label>

                            <select
                                value={playlistId}
                                onChange={(e) =>
                                    setPlaylistId(e.target.value)
                                }
                                className="w-full rounded-xl px-4 py-3"
                                style={{
                                    background:
                                        "var(--color-bg)",
                                    border:
                                        "1px solid var(--color-border)",
                                }}
                            >
                                <option value="">
                                    Select playlist
                                </option>

                                {playlists.map((playlist) => (
                                    <option
                                        key={playlist.id}
                                        value={playlist.id}
                                    >
                                        {playlist.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                className="mb-2 block"
                                style={{
                                    fontWeight: 500,
                                }}
                            >
                                Season (optional)
                            </label>

                            <input
                                type="number"
                                min="1"
                                value={season}
                                onChange={(e) =>
                                    setSeason(e.target.value)
                                }
                                className="w-full rounded-xl px-4 py-3"
                                style={{
                                    background:
                                        "var(--color-bg)",
                                    border:
                                        "1px solid var(--color-border)",
                                }}
                            />
                        </div>
                    </div>
                    <div className="mt-10 flex justify-end">
                        <button
                            onClick={saveVideos}
                            disabled={saving}
                            className="rounded-xl px-8 py-3 transition-opacity disabled:opacity-60"
                            style={{
                                background: "var(--color-primary)",
                                color: "#fff",
                                fontFamily: '"Fredoka", sans-serif',
                                fontWeight: 600,
                            }}
                        >
                            {saving
                                ? "Saving..."
                                : mode === "single"
                                    ? "Save Video"
                                    : `Save ${videos.length} Videos`}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}