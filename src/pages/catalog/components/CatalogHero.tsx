// src/pages/catalog/components/CatalogHero.tsx
import { useLocation, useNavigate } from "react-router-dom";
import Reveal from "../../../components/ui/Reveal";
import { useStats } from "../../../hooks/useStats";
import { useCategoryCounts } from "../../../hooks/useCategoryCounts";
import type { ReactNode } from "react";
import polaroidImg from "../../../assets/images/catalog/polaroid.webp";

interface CategoryPanel {
    slug: string;
    path: string;
    label: string;
    icon: ReactNode;
    countLabel: (n: number) => string;
    accent: string;
}

const iconProps = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
};

const ClapperboardIcon = () => (
    <svg {...iconProps}>
        <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.9-4c1.1-.3 2.2.3 2.5 1.3l.4 2.6Z" />
        <path d="M6.2 5.3 8.7 9.5" />
        <path d="M11.4 4 13.9 8.2" />
        <path d="m3 11 18-5v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    </svg>
);

const MusicIcon = () => (
    <svg {...iconProps}>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
    </svg>
);

const MicIcon = () => (
    <svg {...iconProps}>
        <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
        <path d="M12 18v4" />
        <path d="M8 22h8" />
    </svg>
);

const ArrowIcon = () => (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
    </svg>
);

const CursorIcon = () => (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="m4 4 7.07 17 2.51-7.39L21 11.07Z" />
    </svg>
);

const CATEGORY_PANELS: CategoryPanel[] = [
    {
        slug: "official-content",
        path: "/catalog",
        label: "official content",
        icon: <ClapperboardIcon />,
        countLabel: (n) => `${n} playlist${n === 1 ? "" : "s"}`,
        accent: "#7EC8E3",
    },
    {
        slug: "music",
        path: "/catalog/music",
        label: "music",
        icon: <MusicIcon />,
        countLabel: (n) => `${n} release${n === 1 ? "" : "s"}`,
        accent: "#C3B1E1",
    },
    {
        slug: "variety",
        path: "/catalog/variety",
        label: "variety & guestings",
        icon: <MicIcon />,
        countLabel: (n) => `${n} era${n === 1 ? "" : "s"}`,
        accent: "#A8E6CF",
    },
];

export default function CatalogHero() {
    const { totalVideos, loading } = useStats();
    const counts = useCategoryCounts();
    const location = useLocation();
    const navigate = useNavigate();

    const countBySlug: Record<string, number> = {
        "official-content": counts.officialContent,
        music: counts.music,
        variety: counts.variety,
    };

    return (
        <div
            className="relative pt-36 pb-24 px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center justify-items-center"
            style={{ maxWidth: "1400px", margin: "0 auto", zIndex: 1 }}
        >
            {/* col 1 — polaroid */}
            <div className="flex flex-col items-center gap-4">
                <Reveal direction="up">
                    <div
                        className="relative shrink-0"
                        style={{
                            background: "#fff",
                            padding: "12px 12px 0 12px",
                            borderRadius: "6px",
                            boxShadow: "0 10px 24px rgba(0,0,0,0.15)",
                            transform: "rotate(-4deg)",
                            zIndex: 1,
                            width: "390px",
                        }}
                    >
                        <div
                            style={{
                                width: "360px",
                                height: "360px",
                                background: "var(--color-primary-muted)",
                                borderRadius: "3px",
                                overflow: "hidden",
                            }}
                        >
                            <img
                                src={polaroidImg}
                                alt="love, hearts2hearts"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                        </div>

                        {/* caption strip */}
                        <div
                            className="relative flex items-start justify-center"
                            style={{ padding: "14px 8px 22px 8px" }}
                        >
                            <span
                                style={{
                                    fontFamily: '"Fredoka", sans-serif',
                                    fontWeight: 500,
                                    fontSize: "1rem",
                                    color: "var(--color-text-heading)",
                                    position: "relative",
                                }}
                            >
                                love, hearts2hearts
                                <svg
                                    width={14}
                                    height={14}
                                    viewBox="0 0 24 24"
                                    fill="var(--color-primary)"
                                    style={{ position: "absolute", top: "-10px", right: "-16px" }}
                                    aria-hidden="true"
                                >
                                    <path d="M12 21s-6.8-4.35-9.5-8.1C.6 10.1 1.4 6.6 4.4 5.2c2.2-1 4.6-.2 5.9 1.6l1.7 2.3 1.7-2.3c1.3-1.8 3.7-2.6 5.9-1.6 3 1.4 3.8 4.9 1.9 7.7C18.8 16.65 12 21 12 21Z" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </Reveal>

                {/* video count under polaroid */}
                <Reveal direction="up" delay={100}>
                    <p
                        className="relative text-center"
                        style={{
                            fontFamily: '"Fredoka", sans-serif',
                            fontWeight: 400,
                            fontSize: "1rem",
                            color: "var(--color-text-secondary)",
                            lineHeight: "1.6rem",
                            zIndex: 1,
                            transform: "rotate(-4deg)",
                        }}
                    >
                        <span
                            style={{
                                fontWeight: 700,
                                color: "var(--color-primary-deep)",
                            }}
                        >
                            {loading ? "—" : totalVideos}
                        </span>{" "}
                        videos and counting
                    </p>
                </Reveal>
            </div>

            {/* col 2 — prose intro + nav */}
            <div className="relative flex flex-col gap-8 w-full" style={{ maxWidth: "540px" }}>
                {/* intro block */}
                <div className="relative flex flex-col gap-5 text-center lg:text-left items-center lg:items-start">
                    <Reveal direction="up">
                        <h1
                            className="relative"
                            style={{
                                fontFamily: '"Gasoek One", sans-serif',
                                fontSize: "clamp(2.6rem, 5vw, 4rem)",
                                lineHeight: 1.1,
                                backgroundImage:
                                    "linear-gradient(135deg, var(--color-text-heading), var(--color-primary))",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                color: "transparent",
                                zIndex: 1,
                            }}
                        >
                            the catalog
                        </h1>
                    </Reveal>

                    <Reveal direction="up" delay={100}>
                        <p
                            className="relative max-w-md"
                            style={{
                                fontFamily: '"Fredoka", sans-serif',
                                fontWeight: 400,
                                fontSize: "1rem",
                                color: "var(--color-text-secondary)",
                                lineHeight: "1.6rem",
                                zIndex: 1,
                            }}
                        >
                            every hearts2hearts video, organized the way youtube never
                            could.
                        </p>
                    </Reveal>
                </div>

                {/* nav column */}
                <Reveal direction="up" delay={150}>
                    <div className="flex flex-col gap-2.5 w-full">
                        {CATEGORY_PANELS.map((panel) => {
                            const isActive =
                                panel.path === "/catalog"
                                    ? location.pathname === "/catalog" ||
                                    location.pathname.startsWith("/catalog/official-content/")
                                    : location.pathname === panel.path ||
                                    location.pathname.startsWith(`${panel.path}/`);
                            const count = countBySlug[panel.slug] ?? 0;

                            return (
                                <button
                                    key={panel.slug}
                                    onClick={() => navigate(panel.path)}
                                    className="group flex items-center gap-5 rounded-2xl text-left transition-all duration-200 w-full"
                                    style={{
                                        padding: "14px 18px",
                                        background: isActive
                                            ? "var(--color-surface)"
                                            : "rgba(255,255,255,0.5)",
                                        backdropFilter: "blur(8px)",
                                        WebkitBackdropFilter: "blur(8px)",
                                        border: isActive
                                            ? `1.5px solid ${panel.accent}`
                                            : "1.5px solid transparent",
                                        boxShadow: isActive
                                            ? `0 4px 14px ${panel.accent}40`
                                            : "0 1px 4px rgba(0,0,0,0.03)",
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.borderColor = panel.accent;
                                            e.currentTarget.style.transform = "translateX(2px)";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.borderColor = "transparent";
                                            e.currentTarget.style.transform = "translateX(0)";
                                        }
                                    }}
                                >
                                    <span
                                        className="flex items-center justify-center shrink-0"
                                        style={{
                                            width: "42",
                                            height: "42",
                                            borderRadius: "10px",
                                            background: `${panel.accent}26`,
                                            color: panel.accent,
                                        }}
                                    >
                                        {panel.icon}
                                    </span>

                                    <span className="flex-1 min-w-0">
                                        <span
                                            className="block truncate"
                                            style={{
                                                fontFamily: '"Fredoka", sans-serif',
                                                fontWeight: 600,
                                                fontSize: "0.9375rem",
                                                color: "var(--color-text-heading)",
                                            }}
                                        >
                                            {panel.label}
                                        </span>
                                        <span
                                            className="block"
                                            style={{
                                                fontFamily: '"Fredoka", sans-serif',
                                                fontWeight: 400,
                                                fontSize: "0.75rem",
                                                color: "var(--color-text-secondary)",
                                            }}
                                        >
                                            {counts.loading ? "—" : panel.countLabel(count)}
                                        </span>
                                    </span>

                                    <span
                                        className="shrink-0"
                                        style={{
                                            color: isActive
                                                ? panel.accent
                                                : "var(--color-text-secondary)",
                                        }}
                                    >
                                        <ArrowIcon />
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </Reveal>

                {/* subtle note */}
                <Reveal direction="up" delay={220}>
                    <p
                        className="flex items-center gap-1.5 justify-center lg:justify-start"
                        style={{
                            fontFamily: '"Fredoka", sans-serif',
                            fontWeight: 400,
                            fontSize: "0.75rem",
                            color: "var(--color-text-secondary)",
                            opacity: 0.6,
                            marginTop: "-8px",
                        }}
                    >
                        <CursorIcon />
                        tap a category above to browse its videos
                    </p>
                </Reveal>
            </div>
        </div>
    );
}