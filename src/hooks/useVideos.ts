import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Video } from "../types";

export function useVideos(
    playlistId: string,
    season?: number,
) {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!playlistId) {
            setVideos([]);
            setLoading(false);
            return;
        }

        async function fetchVideos() {
            setLoading(true);
            setError(null);

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
        loading,
        error,
    };
}