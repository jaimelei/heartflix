import type { VercelRequest, VercelResponse } from "@vercel/node";

function extractVideoId(input: string): string | null {
    try {
        if (!input.startsWith("http")) {
            return input;
        }

        const url = new URL(input);

        if (url.hostname.includes("youtu.be")) {
            return url.pathname.slice(1);
        }

        return url.searchParams.get("v");
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
            error: "YouTube URL is required.",
        });
    }

    const videoId = extractVideoId(url);

    if (!videoId) {
        return res.status(400).json({
            error: "Invalid YouTube URL.",
        });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;

    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${apiKey}`
    );

    if (!response.ok) {
        return res.status(500).json({
            error: "Failed to fetch video.",
        });
    }

    const json = await response.json();

    const video = json.items?.[0];

    if (!video) {
        return res.status(404).json({
            error: "Video not found.",
        });
    }

    return res.status(200).json({
        youtube_id: video.id,
        title_en: video.snippet.localized?.title ?? video.snippet.title,
        title_ko: video.snippet.title,
        duration: parseDuration(video.contentDetails.duration),
        thumbnail_url: video.snippet.thumbnails.high.url,
        upload_date: video.snippet.publishedAt,
    });
}