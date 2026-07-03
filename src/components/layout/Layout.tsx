import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import GlobalBackground from "../common/GlobalBackground";

export default function Layout() {
    return (
        <div className="min-h-screen relative">
            <GlobalBackground />
            
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-grow">
                    <Outlet />
                </main>

                <Footer />
            </div>
        </div>
    );
}