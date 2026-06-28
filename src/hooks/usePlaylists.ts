import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Playlist } from "../types";

export function usePlaylists(categorySlug: string) {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!categorySlug) {
            setPlaylists([]);
            setLoading(false);
            return;
        }

        async function fetchPlaylists() {
            setLoading(true);
            setError(null);

            const { data: playlistData, error: playlistError } = await supabase
                .from("h2h_playlists")
                .select(`
                    *,
                    h2h_categories!inner (
                        slug
                    )
                `)
                .eq("h2h_categories.slug", categorySlug)
                .order("sort_order", { ascending: true });

            if (playlistError) {
                setError(playlistError.message);
                setPlaylists([]);
                setLoading(false);
                return;
            }

            const playlistsWithCounts = await Promise.all(
                (playlistData ?? []).map(async (playlist) => {
                    const { count } = await supabase
                        .from("h2h_videos")
                        .select("*", { count: "exact", head: true })
                        .eq("playlist_id", playlist.id);

                    return {
                        ...playlist,
                        video_count: count ?? 0,
                    };
                }),
            );

            setPlaylists(playlistsWithCounts);
            setLoading(false);
        }

        fetchPlaylists();
    }, [categorySlug]);

    return {
        playlists,
        loading,
        error,
    };
}