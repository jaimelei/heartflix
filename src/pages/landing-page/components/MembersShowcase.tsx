import { useEffect, useRef, useState } from "react";
import Reveal from "../../../components/ui/Reveal";
import { members } from "../../../data/members";

interface MemberCardProps {
    member: typeof members[0];
    index: number;
}

function MemberCard({ member, index }: MemberCardProps) {
    const [hovered, setHovered] = useState(false);
    const [imgError, setImgError] = useState(false);

    return (
        <Reveal direction="up" delay={index < 5 ? index * 50 : 0}>
            <div
                className="shrink-0 cursor-pointer"
                style={{ width: "290px" }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div
                    style={{
                        width: "290px",
                        height: "440px",
                        borderRadius: "1.5rem",
                        overflow: "hidden",
                        background: "var(--color-surface)",
                        border: `1px solid ${hovered ? `${member.colorHex}50` : "var(--color-border)"}`,
                        boxShadow: hovered
                            ? `0 10px 25px -5px ${member.colorHex}25, 0 8px 16px -6px ${member.colorHex}25`
                            : "var(--shadow-card)",
                        transform: hovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
                        transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* top area — 60% — photo */}
                    <div
                        className="relative overflow-hidden"
                        style={{
                            height: "60%",
                            background: `linear-gradient(135deg, ${member.colorHex}, ${member.colorHex}88)`,
                        }}
                    >
                        {member.imageUrl && !imgError ? (
                            <img
                                src={member.imageUrl}
                                alt={member.name}
                                onError={() => setImgError(true)}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                                style={{
                                    transform: hovered ? "scale(1.08)" : "scale(1)",
                                }}
                            />
                        ) : (
                            <div
                                className="absolute inset-0 flex items-center justify-center transition-transform duration-700"
                                style={{
                                    transform: hovered ? "scale(1.08)" : "scale(1)",
                                }}
                            >
                                <div
                                    className="flex items-center justify-center shadow-sm"
                                    style={{
                                        width: "96px",
                                        height: "96px",
                                        borderRadius: "9999px",
                                        background: "rgba(255,255,255,0.6)",
                                        fontSize: "2.75rem",
                                    }}
                                >
                                    {member.emoji}
                                </div>
                            </div>
                        )}
                        <div
                            className="absolute inset-x-0 bottom-0"
                            style={{
                                height: "40%",
                                background: "linear-gradient(to top, var(--color-surface), transparent)",
                            }}
                        />
                    </div>

                    {/* bottom area — 40% */}
                    <div
                        className="flex flex-col justify-between"
                        style={{ flex: 1, padding: "1.25rem" }}
                    >
                        <div>
                            {/* stage name (gasoek) */}
                            <h3
                                className="preserve-case transition-colors duration-300"
                                style={{
                                    fontFamily: '"Gasoek One", sans-serif',
                                    fontSize: "1.5rem",
                                    lineHeight: "1.2",
                                    color: hovered ? member.colorHex : "var(--color-text-heading)",
                                }}
                            >
                                {member.name}
                            </h3>

                            {/* full birth name */}
                            <p
                                className="preserve-case mt-1"
                                style={{
                                    fontFamily: '"Fredoka", sans-serif',
                                    fontWeight: 400,
                                    fontSize: "0.8125rem",
                                    color: "var(--color-text-tertiary)",
                                }}
                            >
                                {member.fullName}
                            </p>

                            {/* role / description */}
                            <p
                                className="preserve-case mt-1.5 uppercase tracking-wider"
                                style={{
                                    fontFamily: '"Fredoka", sans-serif',
                                    fontWeight: 600,
                                    fontSize: "0.6875rem",
                                    letterSpacing: "0.06em",
                                    color: hovered ? member.colorHex : "var(--color-text-secondary)",
                                }}
                            >
                                {member.description}
                            </p>
                        </div>

                        {/* stats row (birthday, birthplace, mbti) */}
                        <div
                            className="grid grid-cols-3 gap-1 pt-3"
                            style={{ borderTop: "1px solid var(--color-border-light)" }}
                        >
                            <div className="flex flex-col items-center">
                                <span
                                    className="preserve-case font-semibold text-xs text-center"
                                    style={{ color: "var(--color-text-primary)" }}
                                >
                                    {(() => {
                                        const birthDate = new Date(member.birthday);
                                        const today = new Date();
                                        let age = today.getFullYear() - birthDate.getFullYear();
                                        const m = today.getMonth() - birthDate.getMonth();
                                        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                                            age--;
                                        }
                                        return isNaN(age) ? member.birthday : age;
                                    })()}
                                </span>
                                <span className="text-[9px] uppercase tracking-wider text-[var(--color-text-tertiary)] mt-0.5">age</span>
                            </div>
                            <div
                                className="flex flex-col items-center"
                                style={{ borderLeft: "1px solid var(--color-border-light)", borderRight: "1px solid var(--color-border-light)" }}
                            >
                                <span
                                    className="preserve-case font-semibold text-xs text-center truncate w-full px-1"
                                    style={{ color: "var(--color-text-primary)" }}
                                >
                                    {member.height}
                                </span>
                                <span className="text-[9px] uppercase tracking-wider text-[var(--color-text-tertiary)] mt-0.5">from</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span
                                    className="preserve-case font-semibold text-xs text-center"
                                    style={{ color: "var(--color-text-primary)" }}
                                >
                                    {member.mbti}
                                </span>
                                <span className="text-[9px] uppercase tracking-wider text-[var(--color-text-tertiary)] mt-0.5">mbti</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Reveal>
    );
}

// ─── main component ───────────────────────────────────────────────────────────

export default function MembersShowcase() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hasStartedRef = useRef(false);

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [inView, setInView] = useState(false);

    const loopMembers = [...members, ...members];

    const updateScrollState = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 8);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const clear = () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = null;
        };

        if (!inView || isHovered) {
            clear();
            return;
        }

        const tick = () => {
            const el = scrollRef.current;
            if (!el) return;

            const half = el.scrollWidth / 2;
            if (el.scrollLeft >= half) {
                el.scrollLeft = el.scrollLeft - half;
            }

            el.scrollBy({ left: 350, behavior: "smooth" });
            timerRef.current = setTimeout(tick, 2000);
        };

        if (!hasStartedRef.current) {
            hasStartedRef.current = true;
            timerRef.current = setTimeout(tick, 3000);
        } else {
            timerRef.current = setTimeout(tick, 2000);
        }

        return clear;
    }, [inView, isHovered]);

    const nudge = (amount: number) => {
        scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
    };

    return (
        <section
            ref={sectionRef}
            className="py-16 relative overflow-hidden"
            style={{
                background: `
                    radial-gradient(ellipse 60% 50% at 20% 40%, rgba(168,230,207,0.10) 0%, transparent 50%),
                    radial-gradient(ellipse 50% 60% at 80% 60%, rgba(244,167,187,0.08) 0%, transparent 50%),
                    var(--color-bg)
                `,
            }}
        >
            <div
                aria-hidden="true"
                className="absolute inset-0 flex justify-center items-center pointer-events-none select-none overflow-hidden"
                style={{ zIndex: 0 }}
            >
                <span
                    style={{
                        fontFamily: '"Gasoek One", sans-serif',
                        fontSize: "clamp(8rem, 18vw, 24rem)",
                        color: "var(--color-primary)",
                        opacity: 0.04,
                        whiteSpace: "nowrap",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                    }}
                >
                    MEMBERS
                </span>
            </div>

            <div
                className="relative z-10 flex flex-col items-center text-center gap-4"
                style={{ maxWidth: "80%", margin: "0 auto 3rem" }}
            >
                <Reveal direction="up" delay={0}>
                    <p
                        style={{
                            fontFamily: '"Fredoka", sans-serif',
                            fontWeight: 600,
                            fontSize: "0.875rem",
                            color: "var(--color-primary)",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                        }}
                    >
                        meet the members
                    </p>
                </Reveal>

                <Reveal direction="up" delay={100}>
                    <h2
                        style={{
                            fontFamily: '"Gasoek One", sans-serif',
                            fontSize: "clamp(2rem, 5vw, 3rem)",
                            color: "var(--color-text-heading)",
                            lineHeight: 1.1,
                        }}
                    >
                        eight hearts,{" "}
                        <span
                            style={{
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                backgroundImage:
                                    "linear-gradient(135deg, var(--color-text-heading), var(--color-primary))",
                            }}
                        >
                            one group.
                        </span>
                    </h2>
                </Reveal>

                <Reveal direction="up" delay={200}>
                    <p
                        className="max-w-xl"
                        style={{
                            fontFamily: '"Fredoka", sans-serif',
                            fontWeight: 400,
                            fontSize: "1.125rem",
                            color: "var(--color-text-secondary)",
                        }}
                    >
                        eight members with distinctly different charms that together create a chaotic, lovable dynamic.
                    </p>
                </Reveal>
            </div>

            <div
                className="relative z-10"
                style={{ width: "100vw", position: "relative", left: "50%", marginLeft: "-50vw" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div
                    className="absolute left-0 top-0 bottom-8 flex items-center z-20 pointer-events-none"
                    style={{
                        width: "15vw",
                        background: "linear-gradient(to right, var(--color-bg), transparent)",
                        opacity: canScrollLeft ? 1 : 0,
                        transition: "opacity 200ms ease-out",
                    }}
                >
                    <button
                        className="pointer-events-auto ml-12 flex items-center justify-center"
                        style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "9999px",
                            background: "var(--color-surface)",
                            border: "1px solid var(--color-border)",
                            boxShadow: "var(--shadow-md)",
                            transition: "all 200ms ease-out",
                            cursor: canScrollLeft ? "pointer" : "default",
                        }}
                        onClick={() => nudge(-350)}
                        aria-label="scroll left"
                        tabIndex={canScrollLeft ? 0 : -1}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary-soft)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-glow)";
                            (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
                            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M10 3L5 8l5 5" stroke="var(--color-text-secondary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div
                    className="absolute right-0 top-0 bottom-8 flex items-center justify-end z-20 pointer-events-none"
                    style={{
                        width: "15vw",
                        background: "linear-gradient(to left, var(--color-bg), transparent)",
                        opacity: canScrollRight ? 1 : 0,
                        transition: "opacity 200ms ease-out",
                    }}
                >
                    <button
                        className="pointer-events-auto mr-12 flex items-center justify-center"
                        style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "9999px",
                            background: "var(--color-surface)",
                            border: "1px solid var(--color-border)",
                            boxShadow: "var(--shadow-md)",
                            transition: "all 200ms ease-out",
                            cursor: canScrollRight ? "pointer" : "default",
                        }}
                        onClick={() => nudge(350)}
                        aria-label="scroll right"
                        tabIndex={canScrollRight ? 0 : -1}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary-soft)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-glow)";
                            (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
                            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M6 3l5 5-5 5" stroke="var(--color-text-secondary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto"
                    style={{
                        paddingLeft: "10vw",
                        paddingRight: "10vw",
                        paddingBottom: "2rem",
                        paddingTop: "1rem",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                    onScroll={updateScrollState}
                >
                    {loopMembers.map((member, index) => (
                        <MemberCard
                            key={`${member.slug}-${index}`}
                            member={member}
                            index={index < members.length ? index : 99}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}