import { Link } from "react-router-dom";
import { SITE_TAGLINE, SOCIAL_LINKS, OFFICIAL_LINKS } from "../../constants";

const NAV_LINKS = [
    { label: "home", to: "/" },
    { label: "roadmap", to: "/roadmap" },
    { label: "about", to: "/about" },
];

const OFFICIAL_SOCIALS = [
    { label: "youtube", href: OFFICIAL_LINKS.youtube },
    { label: "instagram", href: OFFICIAL_LINKS.instagram },
    { label: "tiktok", href: OFFICIAL_LINKS.tiktok },
];

const COMMUNITY_SOCIALS = [
    { label: "twitter", href: SOCIAL_LINKS.twitter },
    { label: "tiktok", href: SOCIAL_LINKS.tiktok },
    { label: "donate", href: SOCIAL_LINKS.donation },
];

export default function Footer() {
    return (
        <footer
            style={{
                background: "var(--color-bg-alt)",
                borderTop: "1px solid var(--color-border)",
            }}
        >
            {/* keyframes for footer fade-up */}
            <style>{`
                @keyframes footerFadeUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>

            <div
                className="mx-auto py-8"
                style={{ maxWidth: "85%", width: "100%" }}
            >
                {/* row 1 — main grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12">

                    {/* col 1 — brand */}
                    <div
                        className="flex flex-col gap-4 lg:[animation:footerFadeUp_700ms_cubic-bezier(0.16,1,0.3,1)_both]"
                        style={{ animationDelay: "0ms" }}
                    >
                        <Link
                            to="/"
                            className="inline-block text-7xl w-fit transition-transform duration-200 hover:scale-[1.02]"
                            style={{
                                fontFamily: '"Gasoek One", sans-serif',
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
                    </div>

                    {/* col 2 — navigation */}
                    <div
                        className="flex flex-col gap-4 lg:[animation:footerFadeUp_700ms_cubic-bezier(0.16,1,0.3,1)_both]"
                        style={{ animationDelay: "120ms" }}
                    >
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

                    {/* col 3 — official links */}
                    <div
                        className="flex flex-col gap-4 lg:[animation:footerFadeUp_700ms_cubic-bezier(0.16,1,0.3,1)_both]"
                        style={{ animationDelay: "180ms" }}
                    >
                        <span
                            className="text-sm uppercase tracking-widest"
                            style={{
                                fontFamily: '"Fredoka", sans-serif',
                                fontWeight: 600,
                                color: "var(--color-text-heading)",
                                letterSpacing: "0.1em",
                            }}
                        >
                            official
                        </span>
                        <nav className="flex flex-col gap-2.5">
                            {OFFICIAL_SOCIALS.map(({ label, href }) => (
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

                    {/* col 4 — community links */}
                    <div
                        className="flex flex-col gap-4 lg:[animation:footerFadeUp_700ms_cubic-bezier(0.16,1,0.3,1)_both]"
                        style={{ animationDelay: "240ms" }}
                    >
                        <span
                            className="text-sm uppercase tracking-widest"
                            style={{
                                fontFamily: '"Fredoka", sans-serif',
                                fontWeight: 600,
                                color: "var(--color-text-heading)",
                                letterSpacing: "0.1em",
                            }}
                        >
                            community
                        </span>
                        <nav className="flex flex-col gap-2.5">
                            {COMMUNITY_SOCIALS.map(({ label, href }) => (
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
                    className="mt-4 pt-4 flex flex-col items-center gap-1.5 lg:[animation:footerFadeUp_700ms_cubic-bezier(0.16,1,0.3,1)_both]"
                    style={{ borderTop: "1px solid var(--color-border)", animationDelay: "320ms" }}
                >
                    <p
                        className="text-xs text-center"
                        style={{
                            fontFamily: '"Fredoka", sans-serif',
                            fontWeight: 400,
                            color: "var(--color-text-tertiary)",
                        }}
                    >
                        © 2026 heartflix. made with love by a fan.
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
            </div >
        </footer >
    );
}