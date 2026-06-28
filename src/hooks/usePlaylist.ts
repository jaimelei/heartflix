import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Playlist } from "../types";

export function usePlaylist(playlistId: string) {
    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!playlistId) {
            setPlaylist(null);
            setError(null);
            setLoading(false);
            return;
        }

        async function fetchPlaylist() {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from("h2h_playlists")
                .select("*")
                .eq("id", playlistId)
                .single();

            if (error) {
                setError(error.message);
                setPlaylist(null);
            } else {
                setPlaylist(data);
            }

            setLoading(false);
        }

        fetchPlaylist();
    }, [playlistId]);

    return {
        playlist,
        loading,
        error,
    };
}