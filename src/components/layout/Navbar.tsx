import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const NAV_LINKS = [
    { label: "home", to: "/" },
    { label: "roadmap", to: "/roadmap" },
    { label: "about", to: "/about" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // lock body scroll when drawer is open
    useEffect(() => {
        document.body.style.overflow = drawerOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [drawerOpen]);

    return (
        <>
            <header
                className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 transition-all duration-300"
                style={{
                    background: scrolled
                        ? "var(--color-surface-glass)"
                        : "transparent",
                    backdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
                    WebkitBackdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
                    borderBottom: scrolled
                        ? "1px solid rgba(255,255,255,0.5)"
                        : "1px solid transparent",
                    boxShadow: scrolled ? "var(--shadow-sm)" : "none",
                }}
            >
                {/* logo */}
                <Link
                    to="/"
                    className="font-display text-xl tracking-tight select-none"
                    style={{ color: "var(--color-primary-deep)", fontFamily: '"Gasoek One", sans-serif' }}
                >
                    heartflix
                </Link>

                {/* center nav links — desktop */}
                <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                    {NAV_LINKS.map(({ label, to }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === "/"}
                            className={({ isActive }) =>
                                [
                                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-[var(--color-primary-muted)] text-[var(--color-primary-deep)]"
                                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-alt)]",
                                ].join(" ")
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {/* right — explore catalog CTA */}
                <div className="ml-auto flex items-center gap-3">
                    <Link
                        to="/catalog"
                        className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                        style={{
                            background: "var(--color-primary)",
                            color: "#fff",
                            boxShadow: "var(--shadow-md)",
                        }}
                    >
                        explore catalog
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path
                                d="M2.5 7h9M7.5 3l4 4-4 4"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>

                    {/* hamburger — mobile */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-lg transition-colors duration-200 hover:bg-[var(--color-bg-alt)]"
                        onClick={() => setDrawerOpen(true)}
                        aria-label="open menu"
                    >
                        <span
                            className="block w-5 h-[1.5px] rounded-full transition-all duration-300"
                            style={{ background: "var(--color-text-primary)" }}
                        />
                        <span
                            className="block w-5 h-[1.5px] rounded-full transition-all duration-300"
                            style={{ background: "var(--color-text-primary)" }}
                        />
                        <span
                            className="block w-3.5 h-[1.5px] rounded-full transition-all duration-300 self-start ml-[3px]"
                            style={{ background: "var(--color-text-primary)" }}
                        />
                    </button>
                </div>
            </header>

            {/* mobile drawer backdrop */}
            <div
                className="fixed inset-0 z-40 md:hidden transition-opacity duration-300"
                style={{
                    background: "rgba(0,0,0,0.35)",
                    backdropFilter: "blur(4px)",
                    opacity: drawerOpen ? 1 : 0,
                    pointerEvents: drawerOpen ? "auto" : "none",
                }}
                onClick={() => setDrawerOpen(false)}
                aria-hidden="true"
            />

            {/* mobile drawer */}
            <aside
                className="fixed top-0 right-0 bottom-0 z-50 w-[280px] md:hidden flex flex-col p-6 transition-transform duration-300 ease-out"
                style={{
                    background: "var(--color-surface-glass)",
                    backdropFilter: "blur(24px) saturate(1.4)",
                    WebkitBackdropFilter: "blur(24px) saturate(1.4)",
                    borderLeft: "1px solid rgba(255,255,255,0.5)",
                    transform: drawerOpen ? "translateX(0)" : "translateX(100%)",
                }}
            >
                {/* drawer header */}
                <div className="flex items-center justify-between mb-8">
                    <span
                        className="font-display text-lg"
                        style={{ color: "var(--color-primary-deep)", fontFamily: '"Gasoek One", sans-serif' }}
                    >
                        heartflix
                    </span>
                    <button
                        onClick={() => setDrawerOpen(false)}
                        className="w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 hover:bg-[var(--color-bg-alt)]"
                        aria-label="close menu"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path
                                d="M3 3l10 10M13 3L3 13"
                                stroke="var(--color-text-secondary)"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>

                {/* drawer nav links */}
                <nav className="flex flex-col gap-1 flex-1">
                    {NAV_LINKS.map(({ label, to }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === "/"}
                            onClick={() => setDrawerOpen(false)}
                            className={({ isActive }) =>
                                [
                                    "px-4 py-3 rounded-xl text-base font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-[var(--color-primary-muted)] text-[var(--color-primary-deep)]"
                                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-alt)]",
                                ].join(" ")
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {/* drawer CTA */}
                <Link
                    to="/catalog"
                    onClick={() => setDrawerOpen(false)}
                    className="mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                    style={{
                        background: "var(--color-primary)",
                        color: "#fff",
                        boxShadow: "var(--shadow-md)",
                    }}
                >
                    explore catalog
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path
                            d="M2.5 7h9M7.5 3l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Link>
            </aside>
        </>
    );
}