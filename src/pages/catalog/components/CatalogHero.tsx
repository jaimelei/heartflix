import Reveal from "../../../components/ui/Reveal";
import { useStats } from "../../../hooks/useStats";
import { getDaysRunning } from "../../../constants";

export default function CatalogHero() {
    const { totalVideos, loading } = useStats();

    return (
        <div
            className="py-12 flex flex-col items-center text-center gap-6"
            style={{ maxWidth: "85%", margin: "0 auto" }}
        >
            {/* title */}
            <Reveal direction="up">
                <h1
                    style={{
                        fontFamily: '"Gasoek One", sans-serif',
                        fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                        color: "var(--color-text-heading)",
                        lineHeight: 1.1,
                    }}
                >
                    the catalog
                </h1>
            </Reveal>

            {/* tagline */}
            <Reveal direction="up" delay={100}>
                <p
                    className="max-w-lg"
                    style={{
                        fontFamily: '"Fredoka", sans-serif',
                        fontWeight: 400,
                        fontSize: "1.125rem",
                        color: "var(--color-text-secondary)",
                        lineHeight: "1.75rem",
                    }}
                >
                    every hearts2hearts video, organized the way youtube never could.
                </p>
            </Reveal>

            {/* stats row */}
            <Reveal direction="up" delay={200}>
                <div className="flex items-center gap-4 flex-wrap justify-center">
                    {[
                        {
                            value: loading ? "—" : String(totalVideos),
                            label: "videos",
                        },
                        {
                            value: String(getDaysRunning()),
                            label: "days live",
                        },
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
        </div>
    );
}