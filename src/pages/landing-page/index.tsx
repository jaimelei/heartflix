// Route: /

import Footer from "../../components/layout/Footer";
import Features from "./components/Features";
import Hero from "./components/Hero";
import LandingNavbar from "./components/LandingNavbar";
import MembersShowcase from "./components/MembersShowcase";

export default function HomePage() {
    return (
        <div className="relative min-h-screen bg-[var(--color-bg)]">
            <LandingNavbar />

            <main>
                <Hero />
                <Features />
                <MembersShowcase />
            </main>

            <Footer />
        </div>
    );
}