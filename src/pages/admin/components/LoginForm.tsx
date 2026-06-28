import { useState } from "react";

interface LoginFormProps {
    onSuccess: () => void;
}

export default function LoginForm({
    onSuccess,
}: LoginFormProps) {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error ?? "Login failed.");
                return;
            }

            onSuccess();
        } catch {
            setError("Unable to reach the server.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-[70vh] items-center justify-center px-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm rounded-2xl border p-8"
                style={{
                    background: "var(--color-surface)",
                    borderColor: "var(--color-border)",
                    boxShadow: "var(--shadow-card)",
                }}
            >
                <h1
                    className="mb-6 text-center"
                    style={{
                        fontFamily: '"Fredoka", sans-serif',
                        fontSize: "1.5rem",
                        fontWeight: 600,
                        color: "var(--color-text-heading)",
                    }}
                >
                    admin login
                </h1>

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    className="mb-4 w-full rounded-lg border px-4 py-3 outline-none"
                    style={{
                        background: "var(--color-bg)",
                        borderColor: "var(--color-border)",
                        color: "var(--color-text-primary)",
                    }}
                />

                {error && (
                    <p
                        className="mb-4 text-sm"
                        style={{
                            color: "#ef4444",
                        }}
                    >
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg py-3 transition-opacity disabled:opacity-60"
                    style={{
                        background: "var(--color-primary)",
                        color: "white",
                        fontFamily: '"Fredoka", sans-serif',
                        fontWeight: 600,
                    }}
                >
                    {loading ? "logging in..." : "login"}
                </button>
            </form>
        </div>
    );
}