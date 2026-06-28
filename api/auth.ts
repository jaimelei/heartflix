import type { VercelRequest, VercelResponse } from "@vercel/node";
import { serialize } from "cookie";

export default function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed",
        });
    }

    const { password } = req.body;

    if (!password) {
        return res.status(400).json({
            success: false,
            error: "Password is required.",
        });
    }

    if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({
            success: false,
            error: "Invalid password.",
        });
    }

    const cookie = serialize("admin-session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 8, // 8 hours
    });

    res.setHeader("Set-Cookie", cookie);

    return res.status(200).json({
        success: true,
    });
}