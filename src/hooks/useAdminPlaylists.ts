import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Playlist } from "../types";

export function useAdminPlaylists() {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPlaylists() {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from("h2h_playlists")
                .select(`
                    *,
                    category:h2h_categories (
                        name
                    )
                `)
                .order("sort_order", { ascending: true });

            if (error) {
                setError(error.message);
                setPlaylists([]);
            } else {
                setPlaylists(data ?? []);
            }

            setLoading(false);
        }

        fetchPlaylists();
    }, []);

    return {
        playlists,
        loading,
        error,
    };
}