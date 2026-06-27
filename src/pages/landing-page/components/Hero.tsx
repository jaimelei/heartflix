// src/pages/landing-page/components/Hero.tsx

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../../../components/ui/Reveal";
import { getDaysRunning } from "../../../constants";

// ─── decorative dots ────────────────────────────────────────────────────────

const MEMBER_COLORS = [
    "#F4A7BB", "#FFDAB9", "#C3B1E1", "#FFB5A7",
    "#A8E6CF", "#FFF3B0", "#A7D8F0", "#D4A5E5",
];

const DOTS = Array.from({ length: 14 }, (_, i) => ({
    color: MEMBER_COLORS[i % MEMBER_COLORS.length],
    size: 8 + Math.floor(((i * 37) % 13)),          // 8–20px, deterministic
    top: `${5 + ((i * 17 + 11) % 85)}%`,
    left: `${3 + ((i * 23 + 7) % 90)}%`,
    delay: `${((i * 0.23) % 3).toFixed(2)}s`,
    duration: `${(2.5 + ((i * 0.19) % 1.5)).toFixed(2)}s`,
}));

// ─── fake video card data ────────────────────────────────────────────────────

const FAKE_CARDS = [
    {
        gradient: "linear-gradient(135deg, #B5DFEE 0%, #D4A5E5 100%)",
        title: "hearts2hearts 1st mini album showcase",
        duration: "1:24:03",
        tags: ["🍓", "🌴", "🐰"],
        rotation: "rotate-[-2deg]",
        offset: { x: "left-1/2 -translate-x-1/2", y: "top-[10%]" },
        zIndex: 30,
        depth: 1,
        revealDelay: 800,
    },
    {
        gradient: "linear-gradient(135deg, #A8E6CF 0%, #A7D8F0 100%)",
        title: "h2h studio chit-chat ep.12",
        duration: "28:47",
        tags: ["🧁", "🍓"],
        rotation: "rotate-[5deg]",
        offset: { x: "left-[5%]", y: "top-[8%]" },
        zIndex: 20,
        depth: 0.6,
        revealDelay: 950,
    },
    {
        gradient: "linear-gradient(135deg, #FFF3B0 0%, #FFDAB9 100%)",
        title: "hearts2hearts — 'bloom' mv (official)",
        duration: "3:52",
        tags: ["🌴", "🐰", "🧁", "🍓"],
        rotation: "rotate-[-6deg]",
        offset: { x: "right-[2%]", y: "top-[30%]" },
        zIndex: 10,
        depth: 0.4,
        revealDelay: 1100,
    },
];

// ─── fake video card ─────────────────────────────────────────────────────────

interface FakeCardProps {
    card: typeof FAKE_CARDS[0];
    mouseX: number;
    mouseY: number;
}

function FakeVideoCard({ card, mouseX, mouseY }: FakeCardProps) {
    const shiftX = mouseX * card.depth * 12;
    const shiftY = mouseY * card.depth * 8;

    return (
        <Reveal direction="right" delay={card.revealDelay}>
            <div
                className={`absolute ${card.offset.x} ${card.offset.y} ${card.rotation} w-[300px] rounded-2xl overflow-hidden`}
                style={{
                    zIndex: card.zIndex,
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    boxShadow: "var(--shadow-lg)",
                    transform: `rotate(${card.rotation.replace("rotate-[", "").replace("]", "")}) translate(${shiftX}px, ${shiftY}px)`,
                    transition: "transform 300ms ease-out",
                }}
            >
                {/* thumbnail */}
                <div
                    className="w-full h-[170px] relative"
                    style={{ background: card.gradient }}
                >
                    {/* play icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{ background: "rgba(255,255,255,0.3)", backdropFilter: "blur(4px)" }}
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                                <path d="M6 4.5l8 4.5-8 4.5V4.5z" fill="white" />
                            </svg>
                        </div>
                    </div>
                    {/* duration badge */}
                    <span
                        className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs font-semibold"
                        style={{
                            background: "rgba(0,0,0,0.65)",
                            color: "#fff",
                            fontFamily: '"Fredoka", sans-serif',
                        }}
                    >
                        {card.duration}
                    </span>
                </div>

                {/* card body */}
                <div className="p-3 flex flex-col gap-2">
                    <p
                        className="text-sm font-medium leading-snug line-clamp-2"
                        style={{
                            fontFamily: '"Fredoka", sans-serif',
                            color: "var(--color-text-heading)",
                        }}
                    >
                        {card.title}
                    </p>
                    <div className="flex items-center gap-1">
                        {card.tags.map((tag, i) => (
                            <span
                                key={i}
                                className="text-sm px-1.5 py-0.5 rounded-full"
                                style={{
                                    background: "var(--color-primary-muted)",
                                    fontSize: "0.75rem",
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Reveal>
    );
}

// ─── hero ────────────────────────────────────────────────────────────────────

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const watermarkRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);

    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const [ctaHovered, setCtaHovered] = useState(false);

    // rAF-based scroll parallax (no state — direct DOM manipulation for perf)
    useEffect(() => {
        const handleScroll = () => {
            rafRef.current = requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const opacity = Math.max(1 - scrollY / 500, 0);

                if (contentRef.current) {
                    contentRef.current.style.opacity = String(opacity);
                    contentRef.current.style.transform = `translateY(-${scrollY * 0.15}px)`;
                }
                if (watermarkRef.current) {
                    watermarkRef.current.style.transform = `translateX(-50%) translateY(-${scrollY * 0.35}px)`;
                }
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    // mouse parallax — normalize to -1..1 within hero bounds
    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        setMouseX(((e.clientX - rect.left) / rect.width) * 2 - 1);
        setMouseY(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const handleMouseLeave = () => {
        setMouseX(0);
        setMouseY(0);
    };

    return (
        <section
            ref={sectionRef}
            className="relative h-screen flex items-center overflow-hidden py-16"
            style={{ background: "var(--color-bg)" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* bg layer 1 — watermark */}
            <div
                ref={watermarkRef}
                aria-hidden="true"
                className="absolute bottom-0 left-1/2 pointer-events-none select-none whitespace-nowrap"
                style={{
                    transform: "translateX(-50%)",
                    fontFamily: '"Gasoek One", sans-serif',
                    fontSize: "clamp(8rem, 18vw, 22rem)",
                    lineHeight: 1,
                    color: "transparent",
                    WebkitTextStroke: `4px rgba(126,200,227,0.06)`,
                    zIndex: 0,
                }}
            >
                HEARTFLIX
            </div>

            {/* bg layer 2 — floating dots */}
            <Reveal direction="none" delay={1200} className="absolute inset-0 pointer-events-none select-none z-0">
                <>
                    {DOTS.map((dot, i) => (
                        <span
                            key={i}
                            aria-hidden="true"
                            className="absolute rounded-full"
                            style={{
                                width: dot.size,
                                height: dot.size,
                                background: dot.color,
                                top: dot.top,
                                left: dot.left,
                                opacity: 0.15,
                                animationName: "float",
                                animationDuration: dot.duration,
                                animationDelay: dot.delay,
                                animationTimingFunction: "ease-in-out",
                                animationIterationCount: "infinite",
                            }}
                        />
                    ))}
                </>
            </Reveal>

            {/* foreground content */}
            <div ref={contentRef} className="relative z-10 w-full">
                <div className="max-w-[85%] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-8 items-center">

                    {/* left column — text stack */}
                    <div className="flex flex-col gap-6">

                        {/* eyebrow */}
                        <Reveal direction="left" delay={400}>
                            <p
                                className="text-sm uppercase tracking-widest"
                                style={{
                                    fontFamily: '"Fredoka", sans-serif',
                                    fontWeight: 600,
                                    color: "var(--color-primary)",
                                    letterSpacing: "0.1em",
                                }}
                            >
                                every video. every era. every member.
                            </p>
                        </Reveal>

                        {/* headline */}
                        <Reveal direction="left" delay={500}>
                            <h1
                                style={{
                                    fontFamily: '"Gasoek One", sans-serif',
                                    fontSize: "clamp(3rem, 6vw, 5rem)",
                                    lineHeight: 1.1,
                                    color: "var(--color-text-heading)",
                                }}
                            >
                                hearts2hearts
                                <br />
                                <span
                                    style={{
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                        backgroundImage: "linear-gradient(135deg, var(--color-text-heading), var(--color-primary))",
                                    }}
                                >
                                    in one place.
                                </span>
                            </h1>
                        </Reveal>

                        {/* description */}
                        <Reveal direction="left" delay={600}>
                            <p
                                className="max-w-lg leading-relaxed"
                                style={{
                                    fontFamily: '"Fredoka", sans-serif',
                                    fontWeight: 400,
                                    fontSize: "1.125rem",
                                    color: "var(--color-text-secondary)",
                                }}
                            >
                                browse and watch every hearts2hearts video — official content, music, and variety — organized the way youtube never could.
                            </p>
                        </Reveal>

                        {/* stats row */}
                        <Reveal direction="left" delay={700}>
                            <div className="flex gap-4 flex-wrap">
                                {[
                                    { value: "0", label: "videos" },
                                    { value: String(getDaysRunning()), label: "days live" },
                                ].map(({ value, label }) => (
                                    <div
                                        key={label}
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-full"
                                        style={{ background: "var(--color-primary-muted)" }}
                                    >
                                        <span
                                            style={{
                                                fontFamily: '"Fredoka", sans-serif',
                                                fontWeight: 700,
                                                fontSize: "1.5rem",
                                                color: "var(--color-primary-deep)",
                                            }}
                                        >
                                            {value}
                                        </span>
                                        <span
                                            style={{
                                                fontFamily: '"Fredoka", sans-serif',
                                                fontWeight: 400,
                                                fontSize: "0.875rem",
                                                color: "var(--color-text-secondary)",
                                            }}
                                        >
                                            {label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Reveal>

                        {/* CTA button */}
                        <Reveal direction="left" delay={800}>
                            <Link
                                to="/catalog"
                                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold w-fit transition-all duration-200"
                                style={{
                                    fontFamily: '"Fredoka", sans-serif',
                                    fontWeight: 600,
                                    background: "var(--color-primary)",
                                    color: "#fff",
                                    boxShadow: ctaHovered ? "var(--shadow-glow)" : "none",
                                    backgroundColor: ctaHovered ? "var(--color-primary-deep)" : "var(--color-primary)",
                                }}
                                onMouseEnter={() => setCtaHovered(true)}
                                onMouseLeave={() => setCtaHovered(false)}
                            >
                                explore catalog
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    aria-hidden="true"
                                    style={{
                                        transform: ctaHovered ? "translateX(4px)" : "translateX(0)",
                                        transition: "transform 200ms ease-out",
                                    }}
                                >
                                    <path
                                        d="M3 8h10M9 4l4 4-4 4"
                                        stroke="currentColor"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>
                        </Reveal>
                    </div>

                    {/* right column — decorative card stack (desktop only) */}
                    <div className="relative h-[600px] lg:h-[650px] hidden lg:block">
                        {FAKE_CARDS.map((card) => (
                            <FakeVideoCard
                                key={card.title}
                                card={card}
                                mouseX={mouseX}
                                mouseY={mouseY}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}