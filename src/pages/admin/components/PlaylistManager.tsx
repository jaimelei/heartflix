import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useCategories } from "../../../hooks/useCategories";
import type { Playlist } from "../../../types";

interface PlaylistForm {
    id?: string;
    name: string;
    category_id: string;
    youtube_playlist_id: string;
    sync_enabled: boolean;
    sort_order: number;
}

const emptyForm: PlaylistForm = {
    name: "",
    category_id: "",
    youtube_playlist_id: "",
    sync_enabled: false,
    sort_order: 0,
};

export default function PlaylistManager() {
    const { categories } = useCategories();

    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] =
        useState<PlaylistForm>(emptyForm);

    async function loadPlaylists() {
        setLoading(true);

        const { data } = await supabase
            .from("h2h_playlists")
            .select(`
                *,
                category:h2h_categories(name)
            `)
            .order("sort_order");

        setPlaylists(data ?? []);

        setLoading(false);
    }

    useEffect(() => {
        loadPlaylists();
    }, []);

    function resetForm() {
        setForm(emptyForm);
    }

    async function savePlaylist() {
        if (
            !form.name ||
            !form.category_id
        ) {
            alert("Please complete the required fields.");
            return;
        }

        setSaving(true);

        const payload = {
            name: form.name,
            category_id: form.category_id,
            youtube_playlist_id:
                form.youtube_playlist_id || null,
            sync_enabled: form.sync_enabled,
            sort_order: form.sort_order,
        };

        if (form.id) {
            const response = await fetch("/api/playlists", {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: form.id,
                    ...payload,
                }),
            });
            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                alert(errData.error || "Failed to update playlist.");
                setSaving(false);
                return;
            }
        } else {
            const response = await fetch("/api/playlists", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                alert(errData.error || "Failed to create playlist.");
                setSaving(false);
                return;
            }
        }

        await loadPlaylists();

        resetForm();

        setSaving(false);
    }

    async function deletePlaylist(id: string) {
        if (
            !confirm(
                "Delete this playlist?"
            )
        ) {
            return;
        }

        const response = await fetch("/api/playlists", {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            alert(errData.error || "Failed to delete playlist.");
            return;
        }

        await loadPlaylists();
    }

    return (
        <div
            className="mx-auto max-w-6xl rounded-2xl p-8"
            style={{
                background:
                    "var(--color-surface)",
                border:
                    "1px solid var(--color-border)",
            }}
        >
            <h2
                className="mb-8"
                style={{
                    fontFamily:
                        '"Fredoka", sans-serif',
                    fontWeight: 700,
                    fontSize: "1.75rem",
                }}
            >
                playlist manager
            </h2>

            <div className="grid grid-cols-2 gap-4">
                <input
                    placeholder="Playlist name"
                    value={form.name}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            name: e.target.value,
                        })
                    }
                    className="rounded-xl px-4 py-3"
                />

                <select
                    value={form.category_id}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            category_id:
                                e.target.value,
                        })
                    }
                    className="rounded-xl px-4 py-3"
                >
                    <option value="">
                        Select category
                    </option>

                    {categories.map(
                        (category) => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        )
                    )}
                </select>

                <input
                    placeholder="YouTube Playlist ID"
                    value={
                        form.youtube_playlist_id
                    }
                    onChange={(e) =>
                        setForm({
                            ...form,
                            youtube_playlist_id:
                                e.target.value,
                        })
                    }
                    className="rounded-xl px-4 py-3"
                />

                <input
                    type="number"
                    placeholder="Sort Order"
                    value={form.sort_order}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            sort_order: Number(
                                e.target.value
                            ),
                        })
                    }
                    className="rounded-xl px-4 py-3"
                />

                <label className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={
                            form.sync_enabled
                        }
                        onChange={(e) =>
                            setForm({
                                ...form,
                                sync_enabled:
                                    e.target
                                        .checked,
                            })
                        }
                    />

                    Sync Enabled
                </label>

                <button
                    onClick={savePlaylist}
                    disabled={saving}
                    className="rounded-xl px-6 py-3"
                >
                    {saving
                        ? "Saving..."
                        : form.id
                            ? "Update Playlist"
                            : "Create Playlist"}
                </button>

                <button
                    onClick={resetForm}
                    className="rounded-xl px-6 py-3"
                >
                    Clear
                </button>
            </div>

            <div className="mt-10">
                {loading ? (
                    <p>Loading playlists...</p>
                ) : (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr
                                style={{
                                    borderBottom:
                                        "1px solid var(--color-border)",
                                }}
                            >
                                <th className="p-3 text-left">
                                    Playlist
                                </th>

                                <th className="p-3 text-left">
                                    Category
                                </th>

                                <th className="p-3 text-left">
                                    Sort
                                </th>

                                <th className="p-3 text-left">
                                    Sync
                                </th>

                                <th className="p-3 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {playlists.map((playlist: any) => (
                                <tr
                                    key={playlist.id}
                                    style={{
                                        borderBottom:
                                            "1px solid var(--color-border)",
                                    }}
                                >
                                    <td className="p-3">
                                        <div
                                            style={{
                                                fontWeight: 600,
                                            }}
                                        >
                                            {playlist.name}
                                        </div>

                                        {playlist.youtube_playlist_id && (
                                            <div
                                                className="mt-1 text-sm"
                                                style={{
                                                    color: "var(--color-text-secondary)",
                                                }}
                                            >
                                                {playlist.youtube_playlist_id}
                                            </div>
                                        )}
                                    </td>

                                    <td className="p-3">
                                        {playlist.category?.name}
                                    </td>

                                    <td className="p-3">
                                        {playlist.sort_order}
                                    </td>

                                    <td className="p-3">
                                        {playlist.sync_enabled
                                            ? "✅"
                                            : "—"}
                                    </td>

                                    <td className="p-3">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() =>
                                                    setForm({
                                                        id: playlist.id,
                                                        name: playlist.name,
                                                        category_id:
                                                            playlist.category_id,
                                                        youtube_playlist_id:
                                                            playlist.youtube_playlist_id ??
                                                            "",
                                                        sync_enabled:
                                                            playlist.sync_enabled,
                                                        sort_order:
                                                            playlist.sort_order,
                                                    })
                                                }
                                                className="rounded-lg px-4 py-2"
                                                style={{
                                                    background:
                                                        "var(--color-primary)",
                                                    color: "#fff",
                                                }}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deletePlaylist(
                                                        playlist.id
                                                    )
                                                }
                                                className="rounded-lg px-4 py-2"
                                                style={{
                                                    background:
                                                        "#dc2626",
                                                    color: "#fff",
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}