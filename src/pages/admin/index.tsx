import { useEffect, useState } from "react";

import LoginForm from "./components/LoginForm";
import ContentIngestion from "./components/ContentIngestion";
import PlaylistManager from "./components/PlaylistManager";

type AdminTab = "ingestion" | "playlists";

export default function AdminPage() {
    const [authenticated, setAuthenticated] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);

    const [activeTab, setActiveTab] =
        useState<AdminTab>("ingestion");

    async function checkAuth() {
        try {
            const response = await fetch("/api/auth-status", {
                credentials: "include",
            });

            const data = await response.json();

            setAuthenticated(data.authenticated);
        } catch {
            setAuthenticated(false);
        } finally {
            setCheckingAuth(false);
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    if (checkingAuth) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                checking authentication...
            </div>
        );
    }

    if (!authenticated) {
        return (
            <LoginForm
                onSuccess={checkAuth}
            />
        );
    }

    return (
        <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl gap-8 px-8 py-12">
            <aside
                className="w-64 rounded-2xl p-6"
                style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                }}
            >
                <h1
                    className="mb-8"
                    style={{
                        fontFamily: '"Fredoka", sans-serif',
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color: "var(--color-text-heading)",
                    }}
                >
                    heartflix admin
                </h1>

                <nav className="flex flex-col gap-2">
                    <button
                        onClick={() => setActiveTab("ingestion")}
                        className="rounded-xl px-4 py-3 text-left transition-colors"
                        style={{
                            background:
                                activeTab === "ingestion"
                                    ? "var(--color-primary)"
                                    : "transparent",
                            color:
                                activeTab === "ingestion"
                                    ? "#fff"
                                    : "var(--color-text-primary)",
                        }}
                    >
                        Content Ingestion
                    </button>

                    <button
                        onClick={() => setActiveTab("playlists")}
                        className="rounded-xl px-4 py-3 text-left transition-colors"
                        style={{
                            background:
                                activeTab === "playlists"
                                    ? "var(--color-primary)"
                                    : "transparent",
                            color:
                                activeTab === "playlists"
                                    ? "#fff"
                                    : "var(--color-text-primary)",
                        }}
                    >
                        Playlist Manager
                    </button>
                </nav>
            </aside>

            <main className="flex-1">
                {activeTab === "ingestion" && (
                    <ContentIngestion />
                )}

                {activeTab === "playlists" && (
                    <PlaylistManager />
                )}
            </main>
        </div>
    );
}