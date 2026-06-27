import Reveal from "../../../components/ui/Reveal";
import { SOCIAL_LINKS } from "../../../constants";
import ctaImage from "../../../assets/images/landing-page/cta.webp";

function IconTwitter() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

function IconTikTok() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.79 1.52V6.75a4.85 4.85 0 0 1-1.02-.06z" />
        </svg>
    );
}

export default function CTA() {
    return (
        <section className="py-16 relative overflow-hidden">
            <div className="max-w-[80%] max-h-[300px] mx-auto relative z-10">
                <Reveal direction="none">
                    <div
                        className="bg-white/[0.02] rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row items-stretch"
                        style={{ border: "1px solid var(--color-border-accent)" }}
                    >

                        {/* Left Column */}
                        <div className="w-full lg:w-[45%] p-6 md:p-8 lg:p-10 flex flex-col justify-center gap-4">
                            <Reveal direction="up" delay={150}>
                                <p style={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 600, fontSize: "0.875rem", color: "var(--color-primary-deep)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                                    join the community
                                </p>
                            </Reveal>

                            <Reveal direction="up" delay={300}>
                                <h2 style={{ fontFamily: '"Gasoek One", sans-serif', fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.1, color: "var(--color-text-heading)", marginBottom: "0.5rem" }}>
                                    built by a fan,{" "}
                                    <span style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", backgroundImage: "linear-gradient(135deg, var(--color-text-heading), var(--color-primary))" }}>
                                        for fans.
                                    </span>
                                </h2>
                                <p style={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 400, fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: "1.4rem", maxWidth: "28rem" }}>
                                    follow the project on social media, support development, and help shape what heartflix becomes.
                                </p>
                            </Reveal>

                            <Reveal direction="up" delay={450}>
                                <div className="flex flex-wrap gap-3">
                                    <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full text-sm font-medium transition-all duration-200" style={{ padding: "0.625rem 1.25rem", background: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary-soft)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                                        <IconTwitter /> twitter
                                    </a>
                                    <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full text-sm font-medium transition-all duration-200" style={{ padding: "0.625rem 1.25rem", background: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary-soft)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                                        <IconTikTok /> tiktok
                                    </a>
                                    <a href={SOCIAL_LINKS.donation} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full text-sm font-semibold transition-all duration-200" style={{ padding: "0.625rem 1.25rem", background: "var(--color-primary)", color: "#fff" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--color-primary-deep)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-glow)"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--color-primary)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                                        support 💙
                                    </a>
                                </div>
                            </Reveal>
                        </div>

                        {/* Right Column — exactly as purple */}
                        <Reveal direction="left" delay={200} className="w-full lg:w-[55%] self-stretch">
                            <div className="relative w-full h-full min-h-[300px] [mask-image:linear-gradient(to_bottom,transparent,black_15%)] lg:[mask-image:linear-gradient(to_right,transparent,black_20%)]">
                                <img
                                    src={ctaImage}
                                    alt="Community"
                                    className="absolute inset-0 object-top w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        </Reveal>

                    </div>
                </Reveal>
            </div>
        </section>
    );
}