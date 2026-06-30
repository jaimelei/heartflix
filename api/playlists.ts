// api/playlists.ts

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
    const authenticated =
        req.cookies["admin-session"] === "authenticated";

    if (!authenticated) {
        return res.status(401).json({
            error: "Unauthorized",
        });
    }

    switch (req.method) {
        case "POST":
            return createPlaylist(req, res);

        case "PATCH":
            return updatePlaylist(req, res);

        case "DELETE":
            return deletePlaylist(req, res);

        default:
            return res.status(405).json({
                error: "Method not allowed.",
            });
    }
}

async function createPlaylist(
    req: VercelRequest,
    res: VercelResponse
) {
    const {
        name,
        category_id,
        thumbnail_url,
        youtube_playlist_id,
        sync_enabled,
        sort_order,
    } = req.body;

    const { data, error } = await supabase
        .from("h2h_playlists")
        .insert({
            name,
            category_id,
            thumbnail_url,
            youtube_playlist_id,
            sync_enabled,
            sort_order,
        })
        .select()
        .single();

    if (error) {
        return res.status(500).json({
            error: error.message,
        });
    }

    return res.status(201).json(data);
}

async function updatePlaylist(
    req: VercelRequest,
    res: VercelResponse
) {
    const {
        id,
        name,
        category_id,
        thumbnail_url,
        youtube_playlist_id,
        sync_enabled,
        sort_order,
    } = req.body;

    const { data, error } = await supabase
        .from("h2h_playlists")
        .update({
            name,
            category_id,
            thumbnail_url,
            youtube_playlist_id,
            sync_enabled,
            sort_order,
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return res.status(500).json({
            error: error.message,
        });
    }

    return res.status(200).json(data);
}

async function deletePlaylist(
    req: VercelRequest,
    res: VercelResponse
) {
    const { id } = req.body;

    // Prevent deleting playlists that still contain videos
    const { count } = await supabase
        .from("h2h_videos")
        .select("*", {
            count: "exact",
            head: true,
        })
        .eq("playlist_id", id);

    if ((count ?? 0) > 0) {
        return res.status(400).json({
            error: "Playlist contains videos.",
        });
    }

    const { error } = await supabase
        .from("h2h_playlists")
        .delete()
        .eq("id", id);

    if (error) {
        return res.status(500).json({
            error: error.message,
        });
    }

    return res.status(204).end();
}