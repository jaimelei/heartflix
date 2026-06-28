export interface Member {
    name: string;
    fullName: string;
    emoji: string;
    slug: string;
    color: string;
    colorHex: string;
    birthday: string;
    height: string;
    mbti: string;
    description: string;
    imageUrl: string;
}

export interface Video {
    id: string;
    youtube_id: string;
    title_en: string;
    title_ko: string | null;
    duration: string | null;
    thumbnail_url: string;
    upload_date: string | null;
    playlist_id: string;
    season: number | null;
    member_tags: string[];
    sort_order: number;
    created_at: string;
}

export interface Playlist {
    id: string;
    name: string;
    category_id: string;
    thumbnail_url: string | null;
    youtube_playlist_id: string | null;
    is_live_sync: boolean;
    sort_order: number;
    created_at: string;
    video_count?: number;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    sort_order: number;
}

export interface Season {
    season: number;
    videoCount: number;
}

export type PlayerState = "full" | "mini" | "closed";

export interface PlayerContext {
    state: PlayerState;
    currentVideo: Video | null;
    playVideo: (video: Video) => void;
    minimize: () => void;
    restore: () => void;
    close: () => void;
}

export interface RoadmapPhase {
    phase: number;
    title: string;
    status: "shipped" | "current" | "upcoming";
}