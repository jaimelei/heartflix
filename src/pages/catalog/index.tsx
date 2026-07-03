import { Outlet } from "react-router-dom";
import CatalogHero from "./components/CatalogHero";

export default function CatalogPage() {
    return (
        <div className="relative" style={{ zIndex: 1 }}>
            <CatalogHero />

            {/* Background watermark (desktop only) */}
            <div
                aria-hidden="true"
                className="hidden md:flex pointer-events-none absolute inset-x-0 justify-center overflow-hidden select-none"
                style={{
                    top: "580px",
                    zIndex: 0,
                }}
            >
                <span
                    style={{
                        fontFamily: '"Gasoek One", sans-serif',
                        fontSize: "clamp(7rem, 15vw, 14rem)",
                        fontWeight: 400,
                        lineHeight: 1,
                        whiteSpace: "nowrap",
                        letterSpacing: "0.32em",
                        marginRight: "-0.32em",
                        background:
                            "linear-gradient(90deg, #7EC8E3, #C3B1E1, #A8E6CF)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        opacity: 0.15,
                    }}
                >
                    heartflix
                </span>
            </div>

            <div className="relative" style={{ zIndex: 1 }}>
                <Outlet />
            </div>
        </div>
    );
}