import { useContext } from "react";
import { VideoPlayerContext } from "../components/common/VideoPlayerProvider";

export function useVideoPlayer() {
    const context = useContext(VideoPlayerContext);

    if (!context) {
        throw new Error(
            "useVideoPlayer must be used within VideoPlayerProvider."
        );
    }

    return context;
}