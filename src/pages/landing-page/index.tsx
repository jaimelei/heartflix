import Footer from "../../components/layout/Footer";
import Features from "./components/Features";
import Hero from "./components/Hero";
import LandingNavbar from "./components/LandingNavbar";
import MembersShowcase from "./components/MembersShowcase";
import PlatformPreview from "./components/PlatformPreview";
import CTA from "./components/CTA";
import GlobalBackground from "../../components/common/GlobalBackground";

export default function HomePage() {
    return (
        <div className="relative min-h-screen">
            <GlobalBackground />
            
            <div className="relative z-10">
                <LandingNavbar />

                <main>
                    <Hero />
                    <Features />
                    <MembersShowcase />
                    <PlatformPreview />
                    <CTA />
                </main>

                <Footer />
            </div>
        </div>
    );
}