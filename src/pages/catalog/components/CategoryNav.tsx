// src/pages/catalog/components/CategoryNav.tsx

import { useNavigate, useLocation } from "react-router-dom";

const TABS = [
    { emoji: "🎬", label: "official content", to: "/catalog" },
    { emoji: "🎵", label: "music", to: "/catalog/music" },
    { emoji: "🎤", label: "variety & guestings", to: "/catalog/variety" },
];

export default function CategoryNav() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isActive = (to: string) => {
        if (to === "/catalog") return pathname === "/catalog";
        return pathname.startsWith(to);
    };

    return (
        <div className="flex justify-center py-6">
            <div className="flex items-center gap-3 flex-wrap justify-center">
                {TABS.map(({ emoji, label, to }) => {
                    const active = isActive(to);
                    return (
                        <button
                            key={to}
                            onClick={() => navigate(to)}
                            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300"
                            style={{
                                fontFamily: '"Fredoka", sans-serif',
                                fontWeight: 600,
                                background: active ? "var(--color-primary)" : "var(--color-bg-alt)",
                                color: active ? "#fff" : "var(--color-text-secondary)",
                                border: `1px solid ${active ? "var(--color-primary)" : "var(--color-border)"}`,
                                boxShadow: active ? "var(--shadow-glow)" : "none",
                                transform: "translateY(0)",
                            }}
                            onMouseEnter={e => {
                                if (active) return;
                                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary-soft)";
                                (e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)";
                                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={e => {
                                if (active) return;
                                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                                (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
                                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                            }}
                        >
                            <span aria-hidden="true">{emoji}</span>
                            {label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}