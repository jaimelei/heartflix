import { useParams } from "react-router-dom";
import { usePlaylist } from "../../../hooks/usePlaylist";
import { useSeasons } from "../../../hooks/useSeasons";
import SeasonList from "./SeasonList";
import VideoGrid from "./VideoGrid";

export default function PlaylistView() {
    const { playlistId } = useParams<{
        playlistId: string;
    }>();

    const {
        playlist,
        loading: playlistLoading,
        error: playlistError,
    } = usePlaylist(playlistId ?? "");

    const {
        hasMultipleSeasons,
        loading: seasonsLoading,
        error: seasonsError,
    } = useSeasons(playlistId ?? "");

    if (playlistLoading || seasonsLoading) {
        return (
            <div
                className="py-16 text-center"
                style={{
                    fontFamily: '"Fredoka", sans-serif',
                    color: "var(--color-text-secondary)",
                }}
            >
                loading playlist...
            </div>
        );
    }

    if (playlistError || seasonsError || !playlist) {
        return (
            <div
                className="py-16 text-center"
                style={{
                    fontFamily: '"Fredoka", sans-serif',
                    color: "var(--color-text-secondary)",
                }}
            >
                something went wrong loading this playlist.
            </div>
        );
    }

    return hasMultipleSeasons ? (
        <SeasonList playlist={playlist} />
    ) : (
        <VideoGrid />
    );
}