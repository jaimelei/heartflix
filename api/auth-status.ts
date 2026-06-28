import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    const authenticated =
        req.cookies["admin-session"] === "authenticated";

    return res.status(200).json({
        authenticated,
    });
}