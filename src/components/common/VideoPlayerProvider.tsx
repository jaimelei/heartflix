import { createContext, useCallback, useMemo, useState, type ReactNode } from "react";
import type { PlayerState, Video, VideoPlayerContextValue } from "../../types";
import VideoPlayer from "./VideoPlayer";

export const VideoPlayerContext = createContext<VideoPlayerContextValue | null>(null);

interface VideoPlayerProviderProps {
    children: ReactNode;
}

export default function VideoPlayerProvider({
    children,
}: VideoPlayerProviderProps) {
    const [state, setState] = useState<PlayerState>("closed");
    const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

    const playVideo = useCallback((video: Video) => {
        setCurrentVideo(video);
        setState("full");
    }, []);

    const minimize = useCallback(() => {
        setState("mini");
    }, []);

    const restore = useCallback(() => {
        setState("full");
    }, []);

    const close = useCallback(() => {
        setState("closed");
        setCurrentVideo(null);
    }, []);

    const value = useMemo<VideoPlayerContextValue>(
        () => ({
            state,
            currentVideo,
            playVideo,
            minimize,
            restore,
            close,
        }),
        [
            state,
            currentVideo,
            playVideo,
            minimize,
            restore,
            close,
        ]
    );

    return (
        <VideoPlayerContext.Provider value={value}>
            {children}
            <VideoPlayer />
        </VideoPlayerContext.Provider>
    );
}