import { Link } from "react-router-dom";

const PASTEL_DOTS = [
    { color: "#F4A7BB", size: 12, top: "12%", left: "8%", delay: "0s" },
    { color: "#FFDAB9", size: 8, top: "22%", left: "88%", delay: "0.4s" },
    { color: "#C3B1E1", size: 16, top: "65%", left: "6%", delay: "0.8s" },
    { color: "#FFB5A7", size: 10, top: "78%", left: "82%", delay: "0.2s" },
    { color: "#A8E6CF", size: 14, top: "40%", left: "92%", delay: "1s" },
    { color: "#FFF3B0", size: 9, top: "55%", left: "3%", delay: "0.6s" },
    { color: "#A7D8F0", size: 11, top: "88%", left: "45%", delay: "1.2s" },
    { color: "#D4A5E5", size: 7, top: "8%", left: "55%", delay: "0.3s" },
    { color: "#F4A7BB", size: 6, top: "33%", left: "15%", delay: "0.9s" },
    { color: "#A8E6CF", size: 13, top: "72%", left: "62%", delay: "0.5s" },
    { color: "#C3B1E1", size: 8, top: "18%", left: "72%", delay: "1.4s" },
    { color: "#FFDAB9", size: 10, top: "48%", left: "78%", delay: "0.7s" },
];

// Film frame icon
function IconFilm({ color }: { color: string }) {
    return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <rect x="4" y="8" width="32" height="24" rx="3" stroke={color} strokeWidth="2" />
            <rect x="4" y="13" width="5" height="4" rx="1" fill={color} opacity="0.5" />
            <rect x="4" y="23" width="5" height="4" rx="1" fill={color} opacity="0.5" />
            <rect x="31" y="13" width="5" height="4" rx="1" fill={color} opacity="0.5" />
            <rect x="31" y="23" width="5" height="4" rx="1" fill={color} opacity="0.5" />
            <line x1="13" y1="8" x2="13" y2="32" stroke={color} strokeWidth="1.5" opacity="0.4" />
            <line x1="27" y1="8" x2="27" y2="32" stroke={color} strokeWidth="1.5" opacity="0.4" />
        </svg>
    );
}

// Play button icon
function IconPlay({ color }: { color: string }) {
    return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <circle cx="20" cy="20" r="15" stroke={color} strokeWidth="2" />
            <path d="M17 14.5l10 5.5-10 5.5V14.5z" fill={color} opacity="0.7" />
        </svg>
    );
}

// Heart icon
function IconHeart({ color }: { color: string }) {
    return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path
                d="M20 32s-13-8.5-13-16a7 7 0 0 1 13-3.5A7 7 0 0 1 33 16c0 7.5-13 16-13 16z"
                stroke={color}
                strokeWidth="2"
                strokeLinejoin="round"
                fill={color}
                fillOpacity="0.12"
            />
        </svg>
    );
}

const FLOATING_ICONS = [
    {
        id: "film",
        component: IconFilm,
        color: "#7EC8E3",
        delay: "0s",
        duration: "3s",
    },
    {
        id: "play",
        component: IconPlay,
        color: "#4BA3C7",
        delay: "0.7s",
        duration: "3.5s",
    },
    {
        id: "heart",
        component: IconHeart,
        color: "#B5DFEE",
        delay: "1.3s",
        duration: "2.8s",
    },
];

export default function ComingSoon() {
    return (
        <div
            className="relative flex items-center justify-center overflow-hidden"
            style={{
                minHeight: "calc(100vh - 64px)",
                background: "var(--color-bg)",
            }}
        >
            {/* decorative pastel dots */}
            {PASTEL_DOTS.map((dot, i) => (
                <span
                    key={i}
                    aria-hidden="true"
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: dot.size,
                        height: dot.size,
                        background: dot.color,
                        top: dot.top,
                        left: dot.left,
                        opacity: 0.2,
                        animationName: "float",
                        animationDuration: `${3 + (i % 3) * 0.5}s`,
                        animationDelay: dot.delay,
                        animationTimingFunction: "ease-in-out",
                        animationIterationCount: "infinite",
                    }}
                />
            ))}

            {/* center content */}
            <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">

                {/* floating SVG icon cluster */}
                <div className="flex items-end gap-6">
                    {FLOATING_ICONS.map(({ id, component: Icon, color, delay, duration }) => (
                        <span
                            key={id}
                            style={{
                                display: "inline-block",
                                animationName: "float",
                                animationDuration: duration,
                                animationDelay: delay,
                                animationTimingFunction: "ease-in-out",
                                animationIterationCount: "infinite",
                            }}
                        >
                            <Icon color={color} />
                        </span>
                    ))}
                </div>

                {/* heading */}
                <h1
                    style={{
                        fontFamily: '"Gasoek One", sans-serif',
                        fontSize: "clamp(3rem, 6vw, 5rem)",
                        lineHeight: 1.1,
                        color: "var(--color-primary)",
                    }}
                >
                    coming soon
                </h1>

                {/* subtext */}
                <p
                    className="max-w-md"
                    style={{
                        fontFamily: '"Fredoka", sans-serif',
                        fontWeight: 400,
                        fontSize: "1.125rem",
                        lineHeight: "1.75rem",
                        color: "var(--color-text-secondary)",
                    }}
                >
                    this page is still being built! check the roadmap to see what's next.
                </p>

                {/* CTA pill */}
                <Link
                    to="/roadmap"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-200"
                    style={{
                        fontFamily: '"Fredoka", sans-serif',
                        fontWeight: 600,
                        fontSize: "1rem",
                        background: "var(--color-primary)",
                        color: "#fff",
                    }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = "var(--color-primary-deep)";
                        (e.currentTarget as HTMLElement).style.boxShadow =
                            "0 0 20px rgba(126,200,227,0.15), 0 0 40px rgba(126,200,227,0.05)";
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = "var(--color-primary)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                >
                    view roadmap
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                            d="M3 8h10M9 4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    );
}