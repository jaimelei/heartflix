import { Link } from "react-router-dom";
import { SITE_TAGLINE, SOCIAL_LINKS } from "../../constants";

const NAV_LINKS = [
    { label: "home", to: "/" },
    { label: "catalog", to: "/catalog" },
    { label: "roadmap", to: "/roadmap" },
    { label: "about", to: "/about" },
];

const SUPPORT_LINKS = [
    { label: "donate", href: SOCIAL_LINKS.donation },
    { label: "twitter", href: SOCIAL_LINKS.twitter },
    { label: "tiktok", href: SOCIAL_LINKS.tiktok },
];

// Twitter (X) icon
function IconTwitter() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

// TikTok icon
function IconTikTok() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.79 1.52V6.75a4.85 4.85 0 0 1-1.02-.06z" />
        </svg>
    );
}

export default function Footer() {
    return (
        <footer
            style={{
                background: "var(--color-bg-alt)",
                borderTop: "1px solid var(--color-border)",
            }}
        >
            <div
                className="mx-auto py-16"
                style={{ maxWidth: "85%", width: "100%" }}
            >
                {/* row 1 — main grid */}
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12">

                    {/* col 1 — brand */}
                    <div className="flex flex-col gap-4">
                        <Link
                            to="/"
                            className="inline-block text-xl font-bold w-fit transition-transform duration-200 hover:scale-[1.02]"
                            style={{
                                fontFamily: '"Fredoka", sans-serif',
                                fontWeight: 700,
                                color: "var(--color-primary)",
                            }}
                        >
                            heartflix
                        </Link>

                        <p
                            className="text-sm leading-relaxed max-w-xs"
                            style={{
                                fontFamily: '"Fredoka", sans-serif',
                                fontWeight: 400,
                                color: "var(--color-text-secondary)",
                            }}
                        >
                            {SITE_TAGLINE}
                        </p>

                        {/* social icons */}
                        <div className="flex items-center gap-3 mt-1">
                            <a
                                href={SOCIAL_LINKS.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="twitter"
                                className="transition-colors duration-200"
                                style={{ color: "var(--color-text-tertiary)" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "var(--color-primary)")}
                                onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-tertiary)")}
                            >
                                <IconTwitter />
                            </a>
                            <a
                                href={SOCIAL_LINKS.tiktok}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="tiktok"
                                className="transition-colors duration-200"
                                style={{ color: "var(--color-text-tertiary)" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "var(--color-primary)")}
                                onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-tertiary)")}
                            >
                                <IconTikTok />
                            </a>
                        </div>
                    </div>

                    {/* col 2 — navigation */}
                    <div className="flex flex-col gap-4">
                        <span
                            className="text-sm uppercase tracking-widest"
                            style={{
                                fontFamily: '"Fredoka", sans-serif',
                                fontWeight: 600,
                                color: "var(--color-text-heading)",
                                letterSpacing: "0.1em",
                            }}
                        >
                            navigate
                        </span>
                        <nav className="flex flex-col gap-2.5">
                            {NAV_LINKS.map(({ label, to }) => (
                                <Link
                                    key={to}
                                    to={to}
                                    className="text-sm w-fit transition-colors duration-200"
                                    style={{
                                        fontFamily: '"Fredoka", sans-serif',
                                        fontWeight: 400,
                                        color: "var(--color-text-secondary)",
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.color = "var(--color-primary)")}
                                    onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-secondary)")}
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* col 3 — support */}
                    <div className="flex flex-col gap-4">
                        <span
                            className="text-sm uppercase tracking-widest"
                            style={{
                                fontFamily: '"Fredoka", sans-serif',
                                fontWeight: 600,
                                color: "var(--color-text-heading)",
                                letterSpacing: "0.1em",
                            }}
                        >
                            support
                        </span>
                        <nav className="flex flex-col gap-2.5">
                            {SUPPORT_LINKS.map(({ label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm w-fit transition-colors duration-200"
                                    style={{
                                        fontFamily: '"Fredoka", sans-serif',
                                        fontWeight: 400,
                                        color: "var(--color-text-secondary)",
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.color = "var(--color-primary)")}
                                    onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-secondary)")}
                                >
                                    {label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* row 2 — bottom bar */}
                <div
                    className="mt-8 pt-8 flex flex-col items-center gap-1.5"
                    style={{ borderTop: "1px solid var(--color-border)" }}
                >
                    <p
                        className="text-xs text-center"
                        style={{
                            fontFamily: '"Fredoka", sans-serif',
                            fontWeight: 400,
                            color: "var(--color-text-tertiary)",
                        }}
                    >
                        © 2026 heartflix. made with 💙 by a fan.
                    </p>
                    <p
                        className="text-xs text-center"
                        style={{
                            fontFamily: '"Fredoka", sans-serif',
                            fontWeight: 400,
                            color: "var(--color-text-tertiary)",
                        }}
                    >
                        this is a fan project. not affiliated with sm entertainment or hearts2hearts.
                    </p>
                </div>
            </div>
        </footer>
    );
}