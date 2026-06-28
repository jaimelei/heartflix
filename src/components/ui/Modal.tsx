import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
    const contentRef = useRef<HTMLDivElement>(null);

    // escape key close
    useEffect(() => {
        if (!open) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [open, onClose]);

    // lock body scroll
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    if (!open) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div
                ref={contentRef}
                className="relative w-full flex flex-col"
                style={{
                    maxWidth: "640px",
                    maxHeight: "80vh",
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border-accent)",
                    borderRadius: "1.5rem",
                    boxShadow: "var(--shadow-xl)",
                    animationName: "scale-in",
                    animationDuration: "300ms",
                    animationTimingFunction: "ease-out",
                    animationFillMode: "both",
                }}
            >
                {/* header */}
                <div
                    className="flex items-center justify-between px-6 py-5 shrink-0"
                    style={{ borderBottom: "1px solid var(--color-border)" }}
                >
                    {title ? (
                        <h2
                            style={{
                                fontFamily: '"Fredoka", sans-serif',
                                fontWeight: 600,
                                fontSize: "1.125rem",
                                color: "var(--color-text-heading)",
                            }}
                        >
                            {title}
                        </h2>
                    ) : (
                        <span />
                    )}
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200"
                        style={{ color: "var(--color-text-secondary)" }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.background = "var(--color-bg-alt)";
                            (e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.background = "transparent";
                            (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
                        }}
                        aria-label="close"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* body */}
                <div className="overflow-y-auto px-6 py-5" style={{ maxHeight: "80vh" }}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}