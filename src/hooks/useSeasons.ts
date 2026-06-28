import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Season } from "../types";

export function useSeasons(playlistId: string) {
    const [seasons, setSeasons] = useState<Season[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!playlistId) {
            setSeasons([]);
            setError(null);
            setLoading(false);
            return;
        }

        async function fetchSeasons() {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from("h2h_videos")
                .select("season")
                .eq("playlist_id", playlistId)
                .not("season", "is", null);

            if (error) {
                setError(error.message);
                setSeasons([]);
                setLoading(false);
                return;
            }

            const counts = new Map<number, number>();

            for (const video of data ?? []) {
                const season = video.season as number;
                counts.set(season, (counts.get(season) ?? 0) + 1);
            }

            const seasonList: Season[] = [...counts.entries()]
                .map(([season, videoCount]) => ({
                    season,
                    videoCount,
                }))
                .sort((a, b) => a.season - b.season);

            setSeasons(seasonList);
            setLoading(false);
        }

        fetchSeasons();
    }, [playlistId]);

    return {
        seasons,
        seasonCount: seasons.length,
        hasMultipleSeasons: seasons.length > 1,
        loading,
        error,
    };
}