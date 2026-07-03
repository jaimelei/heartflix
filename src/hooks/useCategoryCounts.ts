// src/hooks/useCategoryCounts.ts
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export interface CategoryCounts {
    officialContent: number;
    music: number;
    variety: number;
    loading: boolean;
}

const CATEGORY_IDS = {
    officialContent: "89b92dc9-e3fd-4282-a86f-e9f01f071bfb",
    music: "531a8471-a224-488a-bbb6-be385bf99bcd",
    variety: "ccdfb447-5436-4416-a6bb-bd528963cb2d",
} as const;

export function useCategoryCounts(): CategoryCounts {
    const [counts, setCounts] = useState<CategoryCounts>({
        officialContent: 0,
        music: 0,
        variety: 0,
        loading: true,
    });

    useEffect(() => {
        let cancelled = false;

        async function fetchCounts() {
            try {
                const [officialRes, musicRes, varietyRes] = await Promise.all([
                    supabase
                        .from("h2h_playlists")
                        .select("id", { count: "exact", head: true })
                        .eq("category_id", CATEGORY_IDS.officialContent),
                    supabase
                        .from("h2h_playlists")
                        .select("id", { count: "exact", head: true })
                        .eq("category_id", CATEGORY_IDS.music),
                    supabase
                        .from("h2h_playlists")
                        .select("id", { count: "exact", head: true })
                        .eq("category_id", CATEGORY_IDS.variety),
                ]);

                if (cancelled) return;

                setCounts({
                    officialContent: officialRes.count ?? 0,
                    music: musicRes.count ?? 0,
                    variety: varietyRes.count ?? 0,
                    loading: false,
                });
            } catch (err) {
                if (cancelled) return;
                console.error("useCategoryCounts: failed to fetch counts", err);
                setCounts((prev) => ({ ...prev, loading: false }));
            }
        }

        fetchCounts();

        return () => {
            cancelled = true;
        };
    }, []);

    return counts;
}