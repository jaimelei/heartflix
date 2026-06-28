import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Video } from "../types";

export function useVideos(
    playlistId: string,
    season?: number,
) {
    const [videos, setVideos] = useState<Video[]>([]);
    const [playlistName, setPlaylistName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!playlistId) {
            setVideos([]);
            setPlaylistName("");
            setLoading(false);
            return;
        }

        async function fetchVideos() {
            setLoading(true);
            setError(null);

            // Fetch playlist name
            const { data: playlist, error: playlistError } = await supabase
                .from("h2h_playlists")
                .select("name")
                .eq("id", playlistId)
                .single();

            if (playlistError) {
                setError(playlistError.message);
                setPlaylistName("");
                setVideos([]);
                setLoading(false);
                return;
            }

            setPlaylistName(playlist.name);

            // Fetch videos
            let query = supabase
                .from("h2h_videos")
                .select("*")
                .eq("playlist_id", playlistId);

            if (season !== undefined) {
                query = query.eq("season", season);
            }

            const { data, error } = await query.order("sort_order", {
                ascending: true,
            });

            if (error) {
                setError(error.message);
                setVideos([]);
            } else {
                setVideos(data ?? []);
            }

            setLoading(false);
        }

        fetchVideos();
    }, [playlistId, season]);

    return {
        videos,
        playlistName,
        loading,
        error,
    };
}