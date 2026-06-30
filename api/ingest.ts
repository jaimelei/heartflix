import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed.",
        });
    }

    const { videos } = req.body;

    if (!Array.isArray(videos) || videos.length === 0) {
        return res.status(400).json({
            error: "No videos supplied.",
        });
    }

    const rows = videos.map((video) => ({
        youtube_id: video.youtube_id,
        title_en: video.title_en,
        title_ko: video.title_ko,
        duration: video.duration,
        thumbnail_url: video.thumbnail_url,
        upload_date: video.upload_date,
        playlist_id: video.playlist_id,
        season: video.season ?? null,
    }));

    const { error } = await supabase
        .from("h2h_videos")
        .upsert(rows, {
            onConflict: "playlist_id,youtube_id",
            ignoreDuplicates: true,
        });

    if (error) {
        return res.status(500).json({
            error: error.message,
        });
    }

    return res.status(200).json({
        success: true,
        processed: rows.length,
    });
}