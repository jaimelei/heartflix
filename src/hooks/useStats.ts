import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useStats() {
    const [totalVideos, setTotalVideos] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            setLoading(true);

            const { count } = await supabase
                .from("h2h_videos")
                .select("*", {
                    count: "exact",
                    head: true,
                });

            setTotalVideos(count ?? 0);
            setLoading(false);
        }

        fetchStats();
    }, []);

    return {
        totalVideos,
        loading,
    };
}