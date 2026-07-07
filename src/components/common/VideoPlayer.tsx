import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useVideoPlayer } from "../../hooks/useVideoPlayer";
import Perforation from "../ui/Perforation";
import { CATEGORY_ACCENTS } from "../ui/catalogAccents";

const MINI_W = 320;
const MINI_H = Math.round((MINI_W * 9) / 16); // 180
const MINI_RIGHT = 24;
const MINI_BOTTOM = 24;

const OPEN_CLOSE_MS = 260;

// No category is available on a bare Video (no playlist/category join here),
// so the player always uses the same accent rather than picking one per
// section — pulled from the shared map so this isn't a fourth hardcoded copy
// of the hex.
const ACCENT = CATEGORY_ACCENTS["official-content"];

function getEmbedUrl(youtubeId: string) {
    return `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
}

function formatUploadDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export default function VideoPlayer() {
    const { state, currentVideo, minimize, restore, close } = useVideoPlayer();

    const isOpen = state !== "closed";
    const isMinimized = state === "mini";

    const iframeWrapRef = useRef<HTMLDivElement>(null);
    const prevMinimized = useRef(isMinimized);
    const prevVideoId = useRef(currentVideo?.id);
    const pendingRectRef = useRef<DOMRect | null>(null);

    const [shouldRender, setShouldRender] = useState(false);
    const [animateIn, setAnimateIn] = useState(false);
    const [displayVideo, setDisplayVideo] = useState(currentVideo);
    const [hovered, setHovered] = useState(false);

    const [prefersReducedMotion] = useState(() => {
        if (typeof window === "undefined" || !window.matchMedia) return false;
        try {
            return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        } catch {
            return false;
        }
    });

    useEffect(() => {
        if (currentVideo) setDisplayVideo(currentVideo);
    }, [currentVideo]);

    // Two-phase mount: render first (invisible), then flip to visible a
    // couple of frames later so the fade+scale actually has a "from" state
    // to transition out of, instead of popping straight to its end value.
    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            let raf2 = 0;
            const raf1 = requestAnimationFrame(() => {
                raf2 = requestAnimationFrame(() => setAnimateIn(true));
            });
            return () => {
                cancelAnimationFrame(raf1);
                cancelAnimationFrame(raf2);
            };
        }

        setAnimateIn(false);
        const timeout = setTimeout(() => setShouldRender(false), OPEN_CLOSE_MS);
        return () => clearTimeout(timeout);
    }, [isOpen]);

    // FLIP animation between full <-> mini — only when the SAME video is
    // restoring/minimizing. If a different video just took over the player,
    // skip the morph and let it render straight into its target layout.
    //
    // The "before" rect is captured synchronously at click time (see
    // handleMinimizeClick/handleRestoreClick below), before minimize()/
    // restore() run — by the time this effect fires, React has already
    // committed the new layout, so reading getBoundingClientRect() here
    // would just return the new position.
    useEffect(() => {
        const minimizedChanged = prevMinimized.current !== isMinimized;
        const videoChanged = prevVideoId.current !== currentVideo?.id;

        prevMinimized.current = isMinimized;
        prevVideoId.current = currentVideo?.id;

        const first = pendingRectRef.current;
        pendingRectRef.current = null;

        if (!minimizedChanged || videoChanged || !first) return;

        const el = iframeWrapRef.current;
        if (!el) return;

        requestAnimationFrame(() => {
            const last = el.getBoundingClientRect();

            const dx = first.left - last.left;
            const dy = first.top - last.top;
            const scaleX = first.width / last.width;
            const scaleY = first.height / last.height;

            if (dx === 0 && dy === 0 && scaleX === 1 && scaleY === 1) {
                return;
            }

            el.style.transition = "none";
            el.style.transform = `translate(${dx}px, ${dy}px) scale(${scaleX}, ${scaleY})`;
            el.style.transformOrigin = "top left";

            el.getBoundingClientRect(); // force reflow

            el.style.transition = "transform 400ms cubic-bezier(0.4, 0, 0.2, 1)";
            el.style.transform = "translate(0, 0) scale(1, 1)";

            const handleEnd = () => {
                el.style.transition = "";
                el.style.transform = "";
                el.style.transformOrigin = "";
                el.removeEventListener("transitionend", handleEnd);
            };
            el.addEventListener("transitionend", handleEnd, { once: true });
        });
    }, [isMinimized, currentVideo?.id]);

    // Escape minimizes out of full view — carried over from the old player.
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;
            if (state === "full") minimize();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [state, minimize]);

    function handleMinimizeClick() {
        if (iframeWrapRef.current) {
            pendingRectRef.current = iframeWrapRef.current.getBoundingClientRect();
        }
        minimize();
    }

    function handleRestoreClick() {
        if (iframeWrapRef.current) {
            pendingRectRef.current = iframeWrapRef.current.getBoundingClientRect();
        }
        restore();
    }

    if (!shouldRender || !displayVideo) return null;

    const showBackdrop = animateIn && !isMinimized;
    const motionOn = !prefersReducedMotion;

    const mountStyle: CSSProperties = {
        pointerEvents: animateIn ? "auto" : "none",
        transformOrigin: "center center",
        willChange: "transform, opacity",
        transition: motionOn
            ? `opacity ${OPEN_CLOSE_MS}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${OPEN_CLOSE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
            : `opacity ${OPEN_CLOSE_MS}ms ease-out`,
        opacity: animateIn ? 1 : 0,
        transform: !motionOn ? "none" : animateIn ? "scale(1)" : "scale(0.9)",
    };

    // Mini mode stays quiet at rest (it's sitting in the corner while people
    // browse) and only picks up the bolder ticket-stub shadow on hover. Full
    // mode is the sole focus of attention while open, so it wears the bold
    // shadow the whole time.
    const softShadow = "0 10px 28px rgba(0,0,0,0.18)";
    const boldShadow = `5px 5px 0px 0px ${ACCENT}`;
    const cardShadow = isMinimized ? (hovered ? boldShadow : softShadow) : boldShadow;
    const cardLift = isMinimized && hovered && motionOn ? "translateY(-3px)" : "translateY(0px)";

    return (
        <>
            {/* backdrop — full mode only */}
            <div
                className="fixed inset-0 z-[59] transition-opacity duration-300"
                style={{
                    background: "rgba(20, 18, 30, 0.55)",
                    backdropFilter: "blur(6px)",
                    opacity: showBackdrop ? 1 : 0,
                    pointerEvents: showBackdrop ? "auto" : "none",
                }}
                onClick={handleMinimizeClick}
            />

            {/* Single persistent player container */}
            <div
                className="fixed z-[60]"
                style={
                    isMinimized
                        ? {
                            right: MINI_RIGHT,
                            bottom: MINI_BOTTOM,
                            width: MINI_W,
                        }
                        : {
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "100%",
                            maxWidth: "56rem",
                            padding: "1.5rem",
                            pointerEvents: "none",
                        }
                }
            >
                <div style={mountStyle}>
                    <div
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        style={{
                            borderRadius: "16px",
                            boxShadow: cardShadow,
                            transform: cardLift,
                            transition: "box-shadow 220ms ease-out, transform 220ms ease-out",
                        }}
                    >
                        <div
                            ref={iframeWrapRef}
                            style={{
                                overflow: "hidden",
                                borderRadius: "16px 16px 0 0",
                                background: "var(--color-bg-alt)",
                            }}
                        >
                            <div
                                style={
                                    isMinimized
                                        ? { width: "100%", height: MINI_H }
                                        : { width: "100%", aspectRatio: "16 / 9" }
                                }
                            >
                                <iframe
                                    src={getEmbedUrl(displayVideo.youtube_id)}
                                    title={displayVideo.title_en}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className="h-full w-full"
                                    style={{ border: "none" }}
                                />
                            </div>
                        </div>

                        <Perforation />

                        {isMinimized ? (
                            <div
                                className="flex items-center justify-between"
                                style={{
                                    background: "var(--color-surface)",
                                    borderRadius: "0 0 16px 16px",
                                    padding: "10px 12px",
                                    gap: "10px",
                                }}
                            >
                                <button
                                    onClick={handleRestoreClick}
                                    className="truncate text-left flex-1"
                                    style={{
                                        fontFamily: '"Fredoka", sans-serif',
                                        fontWeight: 500,
                                        fontSize: "0.8rem",
                                        color: "var(--color-text-primary)",
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        padding: 0,
                                    }}
                                >
                                    {displayVideo.title_en}
                                </button>

                                <button
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        close();
                                    }}
                                    aria-label="Close player"
                                    style={{
                                        flexShrink: 0,
                                        width: "24px",
                                        height: "24px",
                                        borderRadius: "50%",
                                        background: ACCENT,
                                        color: "#1f2937",
                                        border: "none",
                                        cursor: "pointer",
                                        fontSize: "0.65rem",
                                        fontWeight: 700,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    ✕
                                </button>
                            </div>
                        ) : (
                            <div
                                style={{
                                    background: "var(--color-surface)",
                                    borderRadius: "0 0 16px 16px",
                                    padding: "20px",
                                }}
                            >
                                <h2
                                    style={{
                                        fontFamily: '"Fredoka", sans-serif',
                                        fontWeight: 700,
                                        fontSize: "1.25rem",
                                        lineHeight: 1.3,
                                        color: "var(--color-text-heading)",
                                    }}
                                >
                                    {displayVideo.title_en}
                                </h2>

                                {displayVideo.upload_date && (
                                    <p
                                        style={{
                                            fontFamily: '"Fredoka", sans-serif',
                                            fontWeight: 400,
                                            fontSize: "0.8rem",
                                            color: "var(--color-text-tertiary)",
                                            marginTop: "4px",
                                        }}
                                    >
                                        {formatUploadDate(displayVideo.upload_date)}
                                    </p>
                                )}

                                <div className="flex items-center justify-end gap-3" style={{ marginTop: "16px" }}>
                                    <button
                                        onClick={handleMinimizeClick}
                                        style={{
                                            fontFamily: '"Fredoka", sans-serif',
                                            fontWeight: 500,
                                            fontSize: "0.875rem",
                                            color: "var(--color-text-secondary)",
                                            background: "none",
                                            border: "1.5px solid var(--color-border)",
                                            borderRadius: "10px",
                                            padding: "8px 16px",
                                            cursor: "pointer",
                                            transition: "border-color 200ms ease-out, background 200ms ease-out",
                                        }}
                                        onMouseEnter={(event) => {
                                            event.currentTarget.style.borderColor = ACCENT;
                                            event.currentTarget.style.background = "var(--color-bg-alt)";
                                        }}
                                        onMouseLeave={(event) => {
                                            event.currentTarget.style.borderColor = "var(--color-border)";
                                            event.currentTarget.style.background = "none";
                                        }}
                                    >
                                        minimize
                                    </button>

                                    <button
                                        onClick={close}
                                        style={{
                                            fontFamily: '"Fredoka", sans-serif',
                                            fontWeight: 500,
                                            fontSize: "0.875rem",
                                            color: "var(--color-text-secondary)",
                                            background: "none",
                                            border: "1.5px solid var(--color-border)",
                                            borderRadius: "10px",
                                            padding: "8px 16px",
                                            cursor: "pointer",
                                            transition: "border-color 200ms ease-out, background 200ms ease-out",
                                        }}
                                        onMouseEnter={(event) => {
                                            event.currentTarget.style.borderColor = ACCENT;
                                            event.currentTarget.style.background = "var(--color-bg-alt)";
                                        }}
                                        onMouseLeave={(event) => {
                                            event.currentTarget.style.borderColor = "var(--color-border)";
                                            event.currentTarget.style.background = "none";
                                        }}
                                    >
                                        close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}