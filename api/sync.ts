import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function parseDuration(duration: string): string {
    const match =
        duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

    if (!match) {
        return "0:00";
    }

    const hours = Number(match[1] ?? 0);
    const minutes = Number(match[2] ?? 0);
    const seconds = Number(match[3] ?? 0);

    if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed.",
        });
    }

    const apiKey = process.env.YOUTUBE_API_KEY!;

    const { data: playlists, error } = await supabase
        .from("h2h_playlists")
        .select("*")
        .eq("sync_enabled", true);

    if (error) {
        return res.status(500).json({
            error: error.message,
        });
    }

    let inserted = 0;

    for (const playlist of playlists) {
        const playlistResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${playlist.youtube_playlist_id}&maxResults=3&key=${apiKey}`
        );

        if (!playlistResponse.ok) {
            continue;
        }

        const playlistJson = await playlistResponse.json();

        for (const item of playlistJson.items) {
            const youtubeId = item.contentDetails.videoId;

            const { data: existing } = await supabase
                .from("h2h_videos")
                .select("id")
                .eq("youtube_id", youtubeId)
                .maybeSingle();

            if (existing) {
                continue;
            }

            const metadataResponse = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${youtubeId}&key=${apiKey}`
            );

            if (!metadataResponse.ok) {
                continue;
            }

            const metadata = await metadataResponse.json();

            const video = metadata.items?.[0];

            if (!video) {
                continue;
            }

            const { error: insertError } = await supabase
                .from("h2h_videos")
                .insert({
                    youtube_id: video.id,
                    title_en:
                        video.snippet.localized?.title ??
                        video.snippet.title,
                    title_ko: video.snippet.title,
                    duration: parseDuration(
                        video.contentDetails.duration
                    ),
                    thumbnail_url:
                        video.snippet.thumbnails.high.url,
                    upload_date:
                        video.snippet.publishedAt,

                    category_id: playlist.category_id,
                    playlist_id: playlist.id,

                    season: null,
                });

            if (!insertError) {
                inserted++;
            }
        }
    }

    return res.status(200).json({
        success: true,
        inserted,
    });
}