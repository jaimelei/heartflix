import Reveal from "../../../components/ui/Reveal";
import ComingSoon from "../../../pages/coming-soon";

// function BrowserMockup() {
//     return (
//         <div
//             style={{
//                 borderRadius: "1.5rem",
//                 background: "var(--color-surface)",
//                 border: "1px solid var(--color-border-accent)",
//                 boxShadow: "var(--shadow-xl)",
//                 overflow: "hidden",
//             }}
//         >
//             {/* browser chrome top bar */}
//             <div
//                 style={{
//                     height: "40px",
//                     background: "var(--color-bg-alt)",
//                     borderBottom: "1px solid var(--color-border)",
//                     display: "flex",
//                     alignItems: "center",
//                     padding: "0 1rem",
//                     gap: "6px",
//                 }}
//             >
//                 {/* traffic lights */}
//                 <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57", flexShrink: 0 }} />
//                 <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#FEBC2E", flexShrink: 0 }} />
//                 <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840", flexShrink: 0 }} />
//                 {/* fake url bar */}
//                 <div
//                     style={{
//                         flex: 1,
//                         marginLeft: "12px",
//                         height: "20px",
//                         borderRadius: "6px",
//                         background: "var(--color-bg)",
//                         border: "1px solid var(--color-border)",
//                         display: "flex",
//                         alignItems: "center",
//                         paddingLeft: "10px",
//                         gap: "6px",
//                     }}
//                 >
//                     <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
//                         <circle cx="5" cy="5" r="4" stroke="var(--color-text-tertiary)" strokeWidth="1" />
//                         <path d="M5 3v2l1.5 1" stroke="var(--color-text-tertiary)" strokeWidth="1" strokeLinecap="round" />
//                     </svg>
//                     <span style={{ fontSize: "9px", color: "var(--color-text-tertiary)", fontFamily: '"Fredoka", sans-serif' }}>
//                         heartflix.app/catalog
//                     </span>
//                 </div>
//             </div>

//             {/* catalog content area */}
//             <div style={{ background: "var(--color-bg)", padding: "16px", minHeight: "340px" }}>

//                 {/* page title */}
//                 <div style={{ marginBottom: "12px" }}>
//                     <span style={{
//                         fontFamily: '"Gasoek One", sans-serif',
//                         fontSize: "14px",
//                         color: "var(--color-text-heading)",
//                     }}>
//                         catalog
//                     </span>
//                 </div>

//                 {/* category tabs */}
//                 <div style={{ display: "flex", gap: "6px", marginBottom: "14px" }}>
//                     {["official content", "music", "variety"].map((tab, i) => (
//                         <span
//                             key={tab}
//                             style={{
//                                 padding: "3px 10px",
//                                 borderRadius: "9999px",
//                                 fontSize: "9px",
//                                 fontFamily: '"Fredoka", sans-serif',
//                                 fontWeight: 600,
//                                 background: i === 0 ? "var(--color-primary)" : "var(--color-bg-alt)",
//                                 color: i === 0 ? "#fff" : "var(--color-text-secondary)",
//                                 border: i === 0 ? "none" : "1px solid var(--color-border)",
//                             }}
//                         >
//                             {tab}
//                         </span>
//                     ))}
//                 </div>

//                 {/* playlist cards row */}
//                 <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
//                     {[
//                         { label: "comeback content", color: "#B5DFEE", count: "24 videos" },
//                         { label: "studio chit-chat", color: "#C3B1E1", count: "38 videos" },
//                         { label: "music show stages", color: "#A8E6CF", count: "61 videos" },
//                     ].map((pl) => (
//                         <div
//                             key={pl.label}
//                             style={{
//                                 flex: 1,
//                                 borderRadius: "10px",
//                                 overflow: "hidden",
//                                 background: "var(--color-surface)",
//                                 border: "1px solid var(--color-border)",
//                             }}
//                         >
//                             <div style={{ height: "44px", background: `linear-gradient(135deg, ${pl.color}, ${pl.color}88)` }} />
//                             <div style={{ padding: "6px 8px" }}>
//                                 <p style={{ fontSize: "8px", fontFamily: '"Fredoka", sans-serif', fontWeight: 600, color: "var(--color-text-heading)", marginBottom: "2px" }}>
//                                     {pl.label}
//                                 </p>
//                                 <p style={{ fontSize: "7px", fontFamily: '"Fredoka", sans-serif', color: "var(--color-text-tertiary)" }}>
//                                     {pl.count}
//                                 </p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* section label */}
//                 <p style={{ fontSize: "8px", fontFamily: '"Fredoka", sans-serif', fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
//                     recent videos
//                 </p>

//                 {/* video grid */}
//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
//                     {[
//                         { gradient: "linear-gradient(135deg, #F4A7BB, #FFDAB9)", duration: "1:24:03", title: "1st mini album showcase" },
//                         { gradient: "linear-gradient(135deg, #A7D8F0, #C3B1E1)", duration: "28:47", title: "studio chit-chat ep.12" },
//                         { gradient: "linear-gradient(135deg, #A8E6CF, #FFF3B0)", duration: "3:52", title: "bloom mv (official)" },
//                     ].map((v) => (
//                         <div
//                             key={v.title}
//                             style={{
//                                 borderRadius: "8px",
//                                 overflow: "hidden",
//                                 background: "var(--color-surface)",
//                                 border: "1px solid var(--color-border)",
//                             }}
//                         >
//                             <div style={{ height: "48px", background: v.gradient, position: "relative" }}>
//                                 <span style={{
//                                     position: "absolute",
//                                     bottom: "3px",
//                                     right: "4px",
//                                     fontSize: "6px",
//                                     fontFamily: '"Fredoka", sans-serif',
//                                     background: "rgba(0,0,0,0.6)",
//                                     color: "#fff",
//                                     borderRadius: "3px",
//                                     padding: "1px 3px",
//                                 }}>
//                                     {v.duration}
//                                 </span>
//                             </div>
//                             <div style={{ padding: "4px 6px" }}>
//                                 <p style={{ fontSize: "7px", fontFamily: '"Fredoka", sans-serif', fontWeight: 500, color: "var(--color-text-heading)", lineHeight: 1.3 }}>
//                                     {v.title}
//                                 </p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// ─── feature list icons ──────────────────────────────────────────────────────

function IconFolder() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M2 5a2 2 0 0 1 2-2h3l2 2h5a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    );
}

function IconList() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M3 5h12M3 9h12M3 13h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function IconPlay() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7.5 6.5l5 2.5-5 2.5V6.5z" fill="currentColor" opacity="0.8" />
        </svg>
    );
}

const FEATURES = [
    {
        icon: <IconFolder />,
        title: "organized by category",
        description: "three categories to browse: official content, music, and variety.",
    },
    {
        icon: <IconList />,
        title: "playlist-level detail",
        description: "every series, every season, every episode. nothing gets lost.",
    },
    {
        icon: <IconPlay />,
        title: "watch without leaving",
        description: "videos play in a built-in player. minimize it and keep browsing.",
    },
];

// ─── component ───────────────────────────────────────────────────────────────

export default function PlatformPreview() {

    return (
        <section className="py-16 relative overflow-hidden">
            <div
                className="mx-auto grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-16 lg:gap-24 items-center"
                style={{ maxWidth: "80%" }}
            >
                {/* left — coming soon placeholder */}
                <div className="order-2 lg:order-1">
                    <Reveal direction="left">
                        <ComingSoon />
                    </Reveal>
                </div>

                {/* right — text */}
                <div className="order-1 lg:order-2 flex flex-col gap-8">

                    {/* eyebrow */}
                    <Reveal direction="right" delay={100}>
                        <p style={{
                            fontFamily: '"Fredoka", sans-serif',
                            fontWeight: 600,
                            fontSize: "0.875rem",
                            color: "var(--color-primary)",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                        }}>
                            your video library
                        </p>
                    </Reveal>

                    {/* headline */}
                    <Reveal direction="right" delay={200}>
                        <h2 style={{
                            fontFamily: '"Gasoek One", sans-serif',
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            lineHeight: 1.1,
                            color: "var(--color-text-heading)",
                        }}>
                            everything organized,{" "}
                            <span style={{
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                backgroundImage: "linear-gradient(135deg, var(--color-text-heading), var(--color-primary))",
                            }}>
                                nothing missed.
                            </span>
                        </h2>
                    </Reveal>

                    {/* description */}
                    <Reveal direction="right" delay={300}>
                        <p style={{
                            fontFamily: '"Fredoka", sans-serif',
                            fontWeight: 400,
                            fontSize: "1.125rem",
                            color: "var(--color-text-secondary)",
                            lineHeight: "1.75rem",
                        }}>
                            official content, music videos, variety shows, and guestings — all sorted by era, playlist, and member.
                        </p>
                    </Reveal>

                    {/* feature list */}
                    <div className="flex flex-col gap-5">
                        {FEATURES.map((feature, i) => (
                            <Reveal key={feature.title} direction="up" delay={i * 100}>
                                <div className="flex items-start gap-4">
                                    {/* icon box */}
                                    <div
                                        className="shrink-0 flex items-center justify-center"
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "12px",
                                            background: "var(--color-primary-muted)",
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        {feature.icon}
                                    </div>
                                    {/* text */}
                                    <div className="flex flex-col gap-0.5">
                                        <p style={{
                                            fontFamily: '"Fredoka", sans-serif',
                                            fontWeight: 600,
                                            fontSize: "0.9375rem",
                                            color: "var(--color-text-heading)",
                                        }}>
                                            {feature.title}
                                        </p>
                                        <p style={{
                                            fontFamily: '"Fredoka", sans-serif',
                                            fontWeight: 400,
                                            fontSize: "0.8125rem",
                                            color: "var(--color-text-secondary)",
                                        }}>
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}