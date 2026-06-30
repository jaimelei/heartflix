export const SITE_NAME = "heartflix";

export const SITE_TAGLINE = "every hearts2hearts video, one place";

export const SITE_LAUNCH_DATE = "2026-06-30";

export const GROUP_NAME = "hearts2hearts";

export const GROUP_NAME_KR = "하츠투하츠";

export const FANDOM_NAME = "s2u";

export const FANDOM_COLOR = "#7EC8E3";

export const SOCIAL_LINKS = {
    twitter: "https://twitter.com/placeholder",
    tiktok: "https://tiktok.com/@placeholder",
    donation: "https://placeholder.com/donate",
};

export const OFFICIAL_LINKS = {
    youtube: "https://www.youtube.com/@hearts2hearts",
    instagram: "https://www.instagram.com/hearts2hearts_official",
    tiktok: "https://www.tiktok.com/@hearts2hearts_official",
};

export function getDaysRunning(): number {
    const launch = new Date(SITE_LAUNCH_DATE);
    const now = new Date();

    return Math.max(
        0,
        Math.floor(
            (now.getTime() - launch.getTime()) / (1000 * 60 * 60 * 24),
        ),
    );
}