// src/pages/about/index.tsx

import { useState } from "react";
import Reveal from "../../components/ui/Reveal";
import { SOCIAL_LINKS } from "../../constants";

// ─── accordion ────────────────────────────────────────────────────────────────

interface AccordionItemProps {
    question: string;
    children: React.ReactNode;
    index: number;
}

function AccordionItem({ question, children, index }: AccordionItemProps) {
    const [open, setOpen] = useState(false);

    return (
        <Reveal direction="up" delay={index * 80}>
            <div
                style={{
                    borderBottom: "1px solid var(--color-border)",
                }}
            >
                <button
                    onClick={() => setOpen((p) => !p)}
                    className="w-full flex items-center justify-between py-5 text-left transition-colors duration-200"
                    aria-expanded={open}
                >
                    <span
                        style={{
                            fontFamily: '"Fredoka", sans-serif',
                            fontWeight: 600,
                            fontSize: "1.125rem",
                            color: "var(--color-text-heading)",
                        }}
                    >
                        {question}
                    </span>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        aria-hidden="true"
                        style={{
                            flexShrink: 0,
                            marginLeft: "1rem",
                            color: "var(--color-text-secondary)",
                            transform: open ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 300ms ease-out",
                        }}
                    >
                        <path
                            d="M5 7.5l5 5 5-5"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                {/* grid-rows trick for smooth height animation */}
                <div
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                    <div className="overflow-hidden">
                        <div
                            className="pb-5"
                            style={{
                                fontFamily: '"Fredoka", sans-serif',
                                fontWeight: 400,
                                fontSize: "1rem",
                                color: "var(--color-text-secondary)",
                                lineHeight: "1.75rem",
                            }}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </Reveal>
    );
}

// ─── section heading ──────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
    return (
        <h2
            style={{
                fontFamily: '"Gasoek One", sans-serif',
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: "var(--color-text-heading)",
                lineHeight: 1.2,
                marginBottom: "1.25rem",
            }}
        >
            {children}
        </h2>
    );
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
    return (
        <div className="pb-16 pt-24" style={{ maxWidth: "60%", margin: "0 auto" }}>
            <div className="flex flex-col" style={{ gap: "4rem" }}>

                {/* 1 — what is heartflix? */}
                <Reveal direction="up">
                    <section>
                        <SectionHeading>what is heartflix?</SectionHeading>
                        <div
                            className="flex flex-col gap-4"
                            style={{
                                fontFamily: '"Fredoka", sans-serif',
                                fontWeight: 400,
                                fontSize: "1rem",
                                color: "var(--color-text-secondary)",
                                lineHeight: "1.75rem",
                            }}
                        >
                            <p>
                                heartflix is a fan-made video catalog for hearts2hearts. it's a single place to browse, discover, and watch every piece of content the group has put out — organized the way youtube never could be.
                            </p>
                            <p>
                                heartflix doesn't store or host any videos. everything streams directly from youtube. what it does is bring structure: categories, playlists, eras, and member filters so you can actually find what you're looking for.
                            </p>
                            <p>
                                think of it as a library card catalog for hearts2hearts content. the books live elsewhere, but the catalog tells you exactly where everything is.
                            </p>
                        </div>
                    </section>
                </Reveal>

                {/* 2 — who built this? */}
                <Reveal direction="up" delay={50}>
                    <section>
                        <SectionHeading>who built this?</SectionHeading>
                        <div
                            className="flex flex-col gap-4"
                            style={{
                                fontFamily: '"Fredoka", sans-serif',
                                fontWeight: 400,
                                fontSize: "1rem",
                                color: "var(--color-text-secondary)",
                                lineHeight: "1.75rem",
                            }}
                        >
                            <p>
                                i'm a fan of hearts2hearts, and i wanted a better way to find and watch their content. every time i tried to find a specific video — an old variety appearance, a studio session, a music show stage — it took way too long. youtube's search is terrible for this, and nothing else existed.
                            </p>
                            <p>
                                so i built heartflix. it started as a personal project and turned into something i wanted to share with the rest of the fandom. it's a work in progress and i'm building it one phase at a time.
                            </p>
                        </div>
                    </section>
                </Reveal>

                {/* 3 — what this is not */}
                <Reveal direction="up" delay={50}>
                    <section>
                        <SectionHeading>what this is not</SectionHeading>
                        <ul
                            className="flex flex-col gap-3"
                            style={{
                                fontFamily: '"Fredoka", sans-serif',
                                fontWeight: 400,
                                fontSize: "1rem",
                                color: "var(--color-text-secondary)",
                                lineHeight: "1.75rem",
                            }}
                        >
                            {[
                                "not official. heartflix has no affiliation with hearts2hearts, sm entertainment, or anyone connected to the group.",
                                "not a streaming platform. heartflix doesn't host or store any videos — everything plays through youtube.",
                                "not trying to replace youtube. it's just a better way to find content that already lives there.",
                                "not monetized. this is a fan project built out of love for the group, there will never be ads here.",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <span
                                        className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full"
                                        style={{ background: "var(--color-primary)" }}
                                        aria-hidden="true"
                                    />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>
                </Reveal>

                {/* 4 — faq */}
                <Reveal direction="up" delay={50}>
                    <section>
                        <SectionHeading>faq</SectionHeading>
                        <div
                            style={{ borderTop: "1px solid var(--color-border)" }}
                        >
                            <AccordionItem question="is this official?" index={0}>
                                no. heartflix is a fan project with no affiliation to hearts2hearts, sm entertainment, or any related parties. it's built and maintained by a fan, for fans.
                            </AccordionItem>

                            <AccordionItem question="where do the videos come from?" index={1}>
                                all videos are streamed from youtube. heartflix doesn't host or download anything — it just organizes links and metadata so content is easier to find and browse.
                            </AccordionItem>

                            <AccordionItem question="how can i support this?" index={2}>
                                <span>
                                    follow the project on{" "}
                                    <a
                                        href={SOCIAL_LINKS.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: "var(--color-primary)", fontWeight: 500 }}
                                    >
                                        twitter
                                    </a>{" "}
                                    or{" "}
                                    <a
                                        href={SOCIAL_LINKS.tiktok}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: "var(--color-primary)", fontWeight: 500 }}
                                    >
                                        tiktok
                                    </a>
                                    , or consider{" "}
                                    <a
                                        href={SOCIAL_LINKS.donation}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: "var(--color-primary)", fontWeight: 500 }}
                                    >
                                        supporting development
                                    </a>
                                    . even just sharing the site with other fans helps a lot.
                                </span>
                            </AccordionItem>

                            <AccordionItem question="can i suggest videos or report missing content?" index={3}>
                                yes! reach out on twitter or tiktok. the catalog is being built era by era and suggestions from fans are genuinely helpful.
                            </AccordionItem>
                        </div>
                    </section>
                </Reveal>

            </div>
        </div>
    );
}