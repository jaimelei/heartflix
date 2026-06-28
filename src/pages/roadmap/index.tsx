// src/pages/roadmap/index.tsx

import Reveal from "../../components/ui/Reveal";
import { roadmap } from "../../data/roadmap";
import type { RoadmapPhase } from "../../types";

// ─── status config ────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
    shipped: {
        badge: "text-green-600 bg-green-50",
        label: "shipped",
        dotClass: "bg-green-400",
        pulse: false,
    },
    current: {
        badge: "text-amber-600 bg-amber-50",
        label: "in progress",
        dotClass: "bg-amber-400",
        pulse: true,
    },
    upcoming: {
        badge: "text-[var(--color-text-tertiary)] bg-[var(--color-bg-alt)]",
        label: "upcoming",
        dotClass: "bg-[var(--color-border)]",
        pulse: false,
    },
};

// ─── phase card ───────────────────────────────────────────────────────────────

function PhaseCard({ phase, index }: { phase: RoadmapPhase; index: number }) {
    const isLeft = index % 2 === 0;
    const config = STATUS_CONFIG[phase.status];

    const cardInner = (
        <div
            className="p-6 rounded-xl w-full"
            style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-card)",
                maxWidth: "400px",
            }}
        >
            {/* phase number + title */}
            <div className="flex items-start gap-3 mb-3">
                <div
                    className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold"
                    style={{ background: "var(--color-primary)", fontFamily: '"Fredoka", sans-serif' }}
                >
                    {phase.phase}
                </div>
                <p
                    className="pt-0.5"
                    style={{
                        fontFamily: '"Fredoka", sans-serif',
                        fontWeight: 600,
                        fontSize: "0.9375rem",
                        color: "var(--color-text-heading)",
                        lineHeight: 1.4,
                    }}
                >
                    {phase.title}
                </p>
            </div>

            {/* status pill */}
            <div className="flex items-center gap-1.5 pl-11">
                <span className={`w-2 h-2 rounded-full shrink-0 ${config.dotClass} ${config.pulse ? "animate-pulse" : ""}`} />
                <span
                    className={`text-xs rounded-full px-2 py-0.5 ${config.badge}`}
                    style={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 500 }}
                >
                    {config.label}
                </span>
            </div>
        </div>
    );

    return (
        <>
            {/* desktop — alternating */}
            <div className="hidden lg:flex items-center w-full">
                {/* left slot */}
                <div className="w-[calc(50%-2rem)] flex justify-end">
                    {isLeft && (
                        <Reveal direction="left">
                            {cardInner}
                        </Reveal>
                    )}
                </div>

                {/* center dot */}
                <div className="w-16 flex justify-center shrink-0">
                    <div
                        className={`w-4 h-4 rounded-full z-10 ${config.dotClass} ${config.pulse ? "animate-pulse" : ""}`}
                    />
                </div>

                {/* right slot */}
                <div className="w-[calc(50%-2rem)]">
                    {!isLeft && (
                        <Reveal direction="right">
                            {cardInner}
                        </Reveal>
                    )}
                </div>
            </div>

            {/* mobile — all right of line */}
            <div className="relative flex lg:hidden items-start pl-10">
                {/* mobile dot */}
                <div
                    className={`absolute left-0 top-6 w-4 h-4 rounded-full -translate-x-1/2 z-10 ${config.dotClass} ${config.pulse ? "animate-pulse" : ""}`}
                />
                <Reveal direction="up" className="w-full">
                    {cardInner}
                </Reveal>
            </div>
        </>
    );
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function RoadmapPage() {
    return (
        <div className="py-16" style={{ maxWidth: "70%", margin: "0 auto" }}>

            {/* page header */}
            <div className="flex flex-col items-center text-center gap-4 mb-20">
                <Reveal direction="up">
                    <h1
                        style={{
                            fontFamily: '"Gasoek One", sans-serif',
                            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                            color: "var(--color-text-heading)",
                            lineHeight: 1.1,
                        }}
                    >
                        the roadmap
                    </h1>
                </Reveal>
                <Reveal direction="up" delay={100}>
                    <p
                        className="max-w-xl"
                        style={{
                            fontFamily: '"Fredoka", sans-serif',
                            fontWeight: 400,
                            fontSize: "1.125rem",
                            color: "var(--color-text-secondary)",
                            lineHeight: "1.75rem",
                        }}
                    >
                        heartflix is being built one phase at a time. here's what's done and what's coming.
                    </p>
                </Reveal>
            </div>

            {/* timeline */}
            <div className="relative">
                {/* center line — desktop */}
                <div
                    className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2"
                    style={{ background: "var(--color-border)" }}
                    aria-hidden="true"
                />
                {/* left line — mobile */}
                <div
                    className="block lg:hidden absolute left-0 top-0 bottom-0 w-[2px]"
                    style={{ background: "var(--color-border)" }}
                    aria-hidden="true"
                />

                <div className="flex flex-col gap-10">
                    {roadmap.map((phase, index) => (
                        <PhaseCard key={phase.phase} phase={phase} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}