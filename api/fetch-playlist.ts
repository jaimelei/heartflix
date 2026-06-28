import type { VercelRequest, VercelResponse } from "@vercel/node";

function extractPlaylistId(input: string): string | null {
    try {
        if (!input.startsWith("http")) {
            return input;
        }

        const url = new URL(input);
        return url.searchParams.get("list");
    } catch {
        return null;
    }
}

function parseDuration(duration: string): string {
    const match = duration.match(
        /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
    );

    if (!match) {
        return "0:00";
    }

    const hours = Number(match[1] ?? 0);
    const minutes = Number(match[2] ?? 0);
    const seconds = Number(match[3] ?? 0);

    if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, "0")}:${String(
            seconds
        ).padStart(2, "0")}`;
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

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({
            error: "Playlist URL is required.",
        });
    }

    const playlistId = extractPlaylistId(url);

    if (!playlistId) {
        return res.status(400).json({
            error: "Invalid playlist URL.",
        });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;

    const videoIds: string[] = [];

    let pageToken = "";

    do {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${playlistId}&maxResults=50&pageToken=${pageToken}&key=${apiKey}`
        );

        if (!response.ok) {
            return res.status(500).json({
                error: "Failed to fetch playlist.",
            });
        }

        const json = await response.json();

        videoIds.push(
            ...json.items.map(
                (item: any) => item.contentDetails.videoId
            )
        );

        pageToken = json.nextPageToken ?? "";
    } while (pageToken);

    if (videoIds.length === 0) {
        return res.status(200).json([]);
    }

    const videos: any[] = [];

    for (let i = 0; i < videoIds.length; i += 50) {
        const ids = videoIds.slice(i, i + 50).join(",");

        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${ids}&key=${apiKey}`
        );

        if (!response.ok) {
            return res.status(500).json({
                error: "Failed to fetch video metadata.",
            });
        }

        const json = await response.json();

        videos.push(
            ...json.items.map((video: any) => ({
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
                upload_date: video.snippet.publishedAt,
            }))
        );
    }

    return res.status(200).json(videos);
}