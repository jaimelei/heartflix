import { useEffect } from "react";
import { useVideoPlayer } from "../../hooks/useVideoPlayer";

export default function VideoPlayer() {
    const {
        state,
        currentVideo,
        minimize,
        restore,
        close,
    } = useVideoPlayer();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;

            if (state === "full") {
                minimize();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [state, minimize]);

    if (state === "closed" || !currentVideo) {
        return null;
    }

    const embedUrl = `https://www.youtube.com/embed/${currentVideo.youtube_id}?autoplay=1&rel=0`;

    if (state === "mini") {
        return (
            <div
                className="fixed bottom-6 right-6 z-[60] w-80 overflow-hidden rounded-xl border border-heartflix-border bg-heartflix-surface shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow"
                onClick={restore}
            >
                <iframe
                    className="aspect-video w-full"
                    src={embedUrl}
                    title={currentVideo.title_en}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />

                <div className="flex items-center gap-2 p-3">
                    <p className="flex-1 truncate text-xs font-medium">
                        {currentVideo.title_en}
                    </p>

                    <button
                        onClick={(event) => {
                            event.stopPropagation();
                            close();
                        }}
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-heartflix-border transition-colors hover:border-heartflix-primary"
                    >
                        ✕
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[60]">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={minimize}
            />

            <div className="relative mx-auto mt-[8vh] w-[90%] max-w-4xl overflow-hidden rounded-2xl bg-heartflix-surface shadow-xl animate-scale-in">
                <iframe
                    className="aspect-video w-full"
                    src={embedUrl}
                    title={currentVideo.title_en}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />

                <div className="flex items-center justify-between border-t border-heartflix-border p-5">
                    <div>
                        <h2 className="font-semibold">
                            {currentVideo.title_en}
                        </h2>

                        {currentVideo.upload_date && (
                            <p className="mt-1 text-xs text-heartflix-text-tertiary">
                                {currentVideo.upload_date}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={minimize}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-heartflix-border bg-heartflix-bg-alt transition-colors hover:border-heartflix-primary"
                        >
                            ─
                        </button>

                        <button
                            onClick={close}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-heartflix-border bg-heartflix-bg-alt transition-colors hover:border-heartflix-primary"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}