import Reveal from "../../../components/ui/Reveal";

// ─── icons ───────────────────────────────────────────────────────────────────

function IconPlayCircle() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.75" />
            <path d="M10 8.5l6 3.5-6 3.5V8.5z" fill="currentColor" opacity="0.8" />
        </svg>
    );
}

function IconGrid() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="3" width="7.5" height="7.5" rx="2" stroke="currentColor" strokeWidth="1.75" />
            <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" stroke="currentColor" strokeWidth="1.75" />
            <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" stroke="currentColor" strokeWidth="1.75" />
            <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" stroke="currentColor" strokeWidth="1.75" />
        </svg>
    );
}

function IconMusicNote() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M9 17.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM20 15.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
                stroke="currentColor"
                strokeWidth="1.75"
            />
            <path d="M9 17.5V6l11-2v11.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 10l11-2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
    );
}

function IconSearch() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.75" />
            <path d="M15.5 15.5L21 21" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
    );
}

// ─── data ────────────────────────────────────────────────────────────────────

const FEATURES = [
    {
        icon: <IconPlayCircle />,
        title: "organized catalog",
        description: "every video sorted by category, playlist, and era. no more digging through youtube.",
    },
    {
        icon: <IconGrid />,
        title: "browse by member",
        description: "find videos featuring your favorite member with one click.",
    },
    {
        icon: <IconMusicNote />,
        title: "full discography",
        description: "every comeback, every mv, every stage — organized chronologically.",
    },
    {
        icon: <IconSearch />,
        title: "instant search",
        description: "find any video by title across the entire catalog.",
    },
];

// ─── component ───────────────────────────────────────────────────────────────

export default function Features() {
    return (
        <section className="py-8 relative">
            <div className="max-w-[80%] mx-auto">
                <div
                    className="overflow-hidden"
                    style={{
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border-accent)",
                        borderRadius: "2rem",
                        boxShadow: "var(--shadow-md)",
                    }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-4">
                        {FEATURES.map((feature, index) => (
                            <Reveal key={feature.title} direction="up" delay={index * 120}>
                                <div
                                    className="relative p-4 md:p-6 flex flex-col items-center gap-1 text-center"
                                >
                                    {/* vertical divider — not on first card, desktop only */}
                                    {index > 0 && (
                                        <span
                                            aria-hidden="true"
                                            className="absolute left-0 hidden lg:block w-[1px]"
                                            style={{
                                                top: "25%",
                                                bottom: "25%",
                                                background: "var(--color-border)",
                                            }}
                                        />
                                    )}

                                    {/* icon + title row */}
                                    <div className="flex flex-col items-center gap-3">
                                        <span style={{ color: "var(--color-primary)" }}>
                                            {feature.icon}
                                        </span>
                                        <p
                                            style={{
                                                fontFamily: '"Fredoka", sans-serif',
                                                fontWeight: 600,
                                                fontSize: "1rem",
                                                color: "var(--color-text-heading)",
                                            }}
                                        >
                                            {feature.title}
                                        </p>
                                    </div>

                                    {/* description */}
                                    <p
                                        className="max-w-[280px]"
                                        style={{
                                            fontFamily: '"Fredoka", sans-serif',
                                            fontWeight: 400,
                                            fontSize: "0.75rem",
                                            color: "var(--color-text-secondary)",
                                        }}
                                    >
                                        {feature.description}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}