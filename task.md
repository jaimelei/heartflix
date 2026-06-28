# heartflix — developer checklist

> feature-and-commit based. build only what's needed per phase. each numbered item = one logical commit.

---

## phase 0 — foundation
*no deployable output. sets up everything downstream phases depend on.*

- [ ] 0.1 — delete `src/App.css` (vite scaffold leftover)
- [ ] 0.2 — update `index.html`: add SEO meta tags, OG tags, and google fonts preconnect + stylesheet links (Fredoka + Gasoek One)
- [ ] 0.3 — rewrite `src/index.css`: add full `:root` CSS variable palette (colors, member colors, radii, shadows), global body styles (`font-family`, `background-color`, `text-transform: lowercase`, font smoothing), `.preserve-case` utility, and scrollbar hiding
- [ ] 0.4 — extend `tailwind.config.js`: register all heartflix color tokens, fontFamily (display/body), fontSize (hero/hero-lg), borderRadius scale, shadow scale, and all keyframe animations (fade-in, slide-up, slide-down, scale-in, bounce-gentle, float, shimmer, pulse-slow, spin-slow, marquee-left, marquee-right)
- [ ] 0.5 — create `src/types/index.ts`: export `Member`, `Video`, `Playlist`, `Category`, `PlayerState`, `PlayerContext`, `RoadmapPhase` interfaces
- [ ] 0.6 — create `src/constants/index.ts`: `SITE_NAME`, `SITE_TAGLINE`, `SITE_LAUNCH_DATE`, `GROUP_NAME`, `GROUP_NAME_KR`, `FANDOM_NAME`, `FANDOM_COLOR`, `SOCIAL_LINKS`, and `getDaysRunning()` helper
- [ ] 0.7 — create `src/data/members.ts`: export `members` array with all 8 members (name, emoji, slug, color var, colorHex, description)
- [ ] 0.8 — create `src/data/roadmap.ts`: export static array of all 24 public roadmap phases with `phase`, `title`, `status` fields (all set to `upcoming` initially)
- [ ] 0.9 — verify: `npm run build` and `npm run lint` pass with no errors

---

## phase 1 — layout shell & coming soon
*first deployable build. real url with a real layout, even if most pages say "coming soon".*

- [ ] 1.1 — create `src/hooks/useScrollReveal.ts`: IntersectionObserver hook, fire-once, accepts `threshold` option, returns `{ ref, isVisible }`
- [ ] 1.2 — create `src/components/ui/Reveal.tsx`: wrapper component using `useScrollReveal`, supports `direction` (up/down/left/right/none), `delay` (ms), `threshold`, `className` props; applies initial translate/opacity/scale state and transitions to visible state on intersection
- [ ] 1.3 — create `src/components/layout/Navbar.tsx`: sticky top bar (64px), glassmorphism bg that fades in after 50px scroll, heartflix text logo left, centered nav links (home/catalog/roadmap/about) on desktop, search pill right (display-only), mobile hamburger + slide-in drawer with backdrop
- [ ] 1.4 — create `src/components/layout/Footer.tsx`: two-row layout — main grid (brand/nav/support columns) and bottom bar (copyright + disclaimer); all tokens from design system
- [ ] 1.5 — create `src/components/layout/Layout.tsx`: wraps `<Navbar>` + `<Outlet>` inside `<main>` + `<Footer>`, `min-h-screen`, `bg-[var(--color-bg)]`
- [ ] 1.6 — create `src/pages/coming-soon/index.tsx`: full viewport centered layout, floating emoji cluster (🔨🎬💙 with `float` animation at staggered delays), gasoek one heading, subtext, "view roadmap →" pill link, decorative faint pastel dots
- [ ] 1.7 — scaffold `src/pages/landing-page/index.tsx` as an empty placeholder (just renders `<div>coming soon</div>` for now)
- [ ] 1.8 — update `src/App.tsx`: set up route tree — `/` renders `<HomePage>` outside `<Layout>`; all other routes (`/catalog/*`, `/roadmap`, `/about`, `*`) render inside `<Layout>` with `<ComingSoon>`
- [ ] 1.9 — verify: `npm run build` passes; deploy to vercel preview; manually check navbar glassmorphism scroll behavior, coming soon page on mobile (375px) and desktop (1440px)

---

## phase 2 — landing page: setup & hero
*landing page scaffolded. hero section live. first real content on the root route.*

- [ ] 2.1 — update `src/App.tsx`: move `/` route to render `<HomePage>` fully outside `<Layout>` (landing page owns its own navbar and footer)
- [ ] 2.2 — create `src/pages/landing-page/components/LandingNavbar.tsx`: absolute-positioned over hero (transparent, no glassmorphism at top); transitions to sticky + glassmorphism after 100px scroll; same links as global navbar; search pill display-only
- [ ] 2.3 — create `src/pages/landing-page/components/Hero.tsx`: two-column grid (text left, decorative card stack right hidden on mobile); "HEARTFLIX" background watermark with rAF-based parallax scroll (watermark scrolls at 0.35x, content at 0.15x); 12–16 floating pastel dots with staggered `float` animation; staggered `Reveal` on all text elements (eyebrow, headline, description, stats row, CTA button); stats row hardcoded to "0 videos" for now; `getDaysRunning()` for days counter; 3 stacked decorative video preview cards with mouse-tracking positional parallax (depth per card: 1, 0.6, 0.4; 300ms ease-out; resets on mouse leave)
- [ ] 2.4 — wire `src/pages/landing-page/index.tsx`: render `<LandingNavbar>` + `<Hero>` + `<Footer>` (remaining sections added per commit below)
- [ ] 2.5 — verify: `npm run build` passes; check hero parallax, watermark, mouse-tracking cards, Reveal stagger, and stats display at 375px, 768px, 1440px

---

## phase 3 — landing page: features & members showcase

- [ ] 3.1 — create `src/pages/landing-page/components/Features.tsx`: single rounded container, 4-column grid with absolute vertical dividers between cards, 4 feature cards (play circle / grid / music note / search icons + titles + descriptions); staggered `Reveal direction="up"` per card with `index * 120ms` delay
- [ ] 3.2 — add `<Features>` to `src/pages/landing-page/index.tsx` between `<Hero>` and `<Footer>`
- [ ] 3.3 — create `src/pages/landing-page/components/MembersShowcase.tsx`: section header (eyebrow + gasoek one title + description, all `Reveal`); "MEMBERS" background watermark at `opacity-[0.04]`; full-viewport-width horizontal carousel (`w-[100vw] left-1/2 -ml-[50vw]`); auto-scroll (3s initial delay, 2s interval, 350px per tick, snap back to start at end); pause on hover via IntersectionObserver + hover state; gradient fade edges + scroll arrows (show/hide on `canScrollLeft` / `canScrollRight`); 8 member cards (pastel gradient top area, emoji placeholder in white circle, name + description + role badge pill, hover border using `member.colorHex`); staggered `Reveal` on first 5 cards
- [ ] 3.4 — add `<MembersShowcase>` to `src/pages/landing-page/index.tsx`
- [ ] 3.5 — verify: `npm run build` passes; carousel auto-scroll and pause-on-hover work; gradient edges and arrows show/hide correctly; member card hover border applies per-member color; responsive at all breakpoints

---

## phase 4 — landing page: platform preview & CTA

- [ ] 4.1 — create `src/pages/landing-page/components/PlatformPreview.tsx`: two-column layout (browser-frame mockup left, text right); browser mockup built from HTML/CSS — top bar with 3 dots + fake URL bar, content area showing a static mini catalog (category tabs, a few playlist cards, a video grid) using heartflix design tokens; `scale-[1.01]` on hover; text column has eyebrow, gasoek one headline, description, 3 feature list items each with icon box (`rounded-xl bg-[var(--color-primary-muted)]`) + copy; all elements wrapped in `Reveal`
- [ ] 4.2 — add `<PlatformPreview>` to `src/pages/landing-page/index.tsx`
- [ ] 4.3 — create `src/pages/landing-page/components/CTA.tsx`: rounded gradient container (`from-[var(--color-primary-soft)] to-[var(--color-bg)]`); left column (45%) with eyebrow, headline, description, twitter + tiktok + donate buttons; right column (55%) with floating member emojis in pastel circles using `float` animation, `mask-image` left-fade; `Reveal direction="none"` wraps entire container
- [ ] 4.4 — wire up `src/pages/landing-page/index.tsx`: finalize full composition — `<LandingNavbar>` + `<Hero>` + `<Features>` + `<MembersShowcase>` + `<PlatformPreview>` + `<CTA>` + `<Footer>`
- [ ] 4.5 — verify: `npm run build` passes; responsive review at 375px, 768px, 1440px; check all Reveal animations, CTA mask-image fade, donate/social buttons, nav links; deploy to vercel production — **first launch**

---

## phase 5 — roadmap page

- [ ] 5.1 — create `src/pages/roadmap/index.tsx`: page header (gasoek one title + fredoka subtext); vertical alternating timeline (desktop) / left-aligned (mobile) with absolute center line; phase cards built from `roadmap.ts` data — each has phase badge, title, status pill (shipped/in progress/upcoming) with correct colors and dot indicator; current phase dot uses `animate-pulse`; staggered `Reveal direction="up"` with `index * 80ms` delay
- [ ] 5.2 — update `src/App.tsx`: swap `/roadmap` route from `<ComingSoon>` to `<RoadmapPage>`
- [ ] 5.3 — verify: `npm run build` passes; timeline alternates correctly on desktop, stacks on mobile; status pills render correct colors; animate-pulse on current phase; deploy to vercel

---

## phase 6 — about page

- [ ] 6.1 — create `src/pages/about/index.tsx`: article-style layout (`max-w-[60%] mx-auto`); 4 content sections stacked with `gap-16` — "what is heartflix?", "who built this?", "what this is not" (bullet list), FAQ (3–4 questions as accordion); accordion uses `grid-rows-[0fr]→[1fr]` height animation with chevron rotating 180deg on open; each section wrapped in `Reveal`
- [ ] 6.2 — update `src/App.tsx`: swap `/about` route from `<ComingSoon>` to `<AboutPage>`
- [ ] 6.3 — verify: `npm run build` passes; FAQ accordion open/close animation smooth; no layout shift on accordion toggle; deploy to vercel

---

## phase 7 — supabase setup & data layer
*no visible UI changes. sets up the data foundation all catalog components depend on.*

- [ ] 7.1 — install `@supabase/supabase-js`; add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env.local` and vercel environment variables
- [ ] 7.2 — create `src/lib/supabase.ts`: `createClient(...)` with anon key (read-only public client)
- [ ] 7.3 — run supabase SQL: create `categories`, `playlists`, `videos` tables with all columns and relationships; enable RLS; add public read policies for all three tables
- [ ] 7.4 — seed supabase with 3 categories (official content, music, variety) with correct slugs and sort_order
- [ ] 7.5 — create `src/hooks/useCategories.ts`: fetch all categories ordered by `sort_order`; returns `{ categories, loading, error }`
- [ ] 7.6 — create `src/hooks/usePlaylists.ts`: fetch playlists for a given `category_id` with video count aggregation; returns `{ playlists, loading, error }`
- [ ] 7.7 — create `src/hooks/useVideos.ts`: fetch videos filtered by `playlist_id` and optional `season`; returns `{ videos, loading, error }`
- [ ] 7.8 — create `src/hooks/useStats.ts`: fetch total video count from `videos` table; returns `{ totalVideos, loading }`
- [ ] 7.9 — verify: `npm run build` passes; confirm supabase queries return data in browser devtools; no errors from missing env vars in vercel

---

## phase 8 — catalog: shared components
*VideoCard and Modal built here because both PlaylistGrid and VideoGrid need them.*

- [ ] 8.1 — create `src/components/ui/VideoCard.tsx`: thumbnail area with `scale-105` hover and play overlay on hover, duration badge (bottom-right absolute), info area with title (line-clamp-2) and upload date; accepts `index` prop for staggered `Reveal delay={index * 50}`; `onClick` prop stubbed (wired to player in phase 12)
- [ ] 8.2 — create `src/components/ui/Modal.tsx`: fixed overlay with `bg-black/30 backdrop-blur-sm` backdrop, `scale-in` entrance and reverse exit animation (300ms), escape key close, header slot (title + X button) + body slot; `max-h-[80vh] overflow-y-auto`
- [ ] 8.3 — verify: `npm run build` passes; VideoCard renders correctly with a mock video object; Modal opens and closes with correct animation

---

## phase 9 — catalog: hero & category nav

- [ ] 9.1 — create `src/pages/catalog/components/CatalogHero.tsx`: centered page header, gasoek one title "the catalog", fredoka tagline, stats row using `useStats` (same pill style as landing hero but now live data)
- [ ] 9.2 — create `src/pages/catalog/components/CategoryNav.tsx`: three pill tabs (🎬 official content / 🎵 music / 🎤 variety & guestings); active tab determined by current route; inactive/active styles per design spec; navigates on click; hover lift on inactive tabs
- [ ] 9.3 — scaffold `src/pages/catalog/index.tsx`: compose `<CatalogHero>` + `<CategoryNav>` + `<Outlet>`; wire up nested routes for category and playlist views
- [ ] 9.4 — update `src/App.tsx`: replace `/catalog/*` `<ComingSoon>` with real catalog routes; update landing hero stats to use `useStats`
- [ ] 9.5 — verify: `npm run build` passes; category tabs navigate to correct routes; active tab highlights correctly; stats pill shows live count; deploy to vercel

---

## phase 10 — catalog: playlist grid & video grid

- [ ] 10.1 — create `src/pages/catalog/components/PlaylistGrid.tsx`: responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`); playlist cards using `usePlaylists`; loading shimmer skeletons; 2x2 thumbnail grid or gradient placeholder; video count badge; staggered `Reveal direction="up" delay={index * 60}`; navigates to playlist on click
- [ ] 10.2 — create `src/pages/catalog/components/VideoGrid.tsx`: back link, playlist title, responsive video grid using `useVideos` + `<VideoCard>`; loading shimmer skeletons; staggered Reveal
- [ ] 10.3 — create `src/pages/catalog/components/SeasonList.tsx`: shown when playlist has `season_count > 1`; season number cards; clicking opens `<Modal>` with that season's videos as a vertical `<VideoCard>` list
- [ ] 10.4 — wire playlist and video grid into the catalog nested route structure in `src/pages/catalog/index.tsx`
- [ ] 10.5 — verify: `npm run build` passes; playlist cards navigate to video grid; back link works; season modal opens and closes correctly; loading skeletons display; deploy to vercel

---

## phase 11 — global video player

- [ ] 11.1 — create `src/hooks/useVideoPlayer.ts`: `useContext(VideoPlayerContext)`; export typed hook
- [ ] 11.2 — create `src/components/common/VideoPlayerProvider.tsx`: React context with `{ state: PlayerState, currentVideo: Video | null }`; exposes `playVideo`, `minimize`, `restore`, `close`; renders `<VideoPlayer>` as sibling of `<App>` (persists across navigation)
- [ ] 11.3 — create `src/components/common/VideoPlayer.tsx`: single persistent `<div>` wrapping one `<iframe>` — never remounted; FLIP animation on state transitions (capture rect before → set state → `useLayoutEffect` capture new rect → apply inverse transform → rAF → animate to identity at 400ms ease-out); full state (fixed overlay, backdrop click minimizes, centered panel, iframe, title + date, minimize + close buttons); mini state (bottom-right fixed, 320px wide, click anywhere to restore, close button, hover `shadow-glow`); closed state (not rendered)
- [ ] 11.4 — update `src/main.tsx`: wrap `<App>` with `<VideoPlayerProvider>`
- [ ] 11.5 — wire `<VideoCard>` `onClick` to `playVideo(video)` from `useVideoPlayer`
- [ ] 11.6 — verify: `npm run build` passes; FLIP animation runs correctly; single iframe persists across minimize/restore (video keeps playing); player persists while navigating between routes; test at 375px and 1440px; deploy to vercel

---

## phase 12 — admin dashboard

- [ ] 12.1 — create `api/auth.ts`: vercel serverless function; receives password in request body; compares against `ADMIN_PASSWORD` env var; returns `{ success: true/false }`; sets signed httpOnly session cookie; no supabase auth
- [ ] 12.2 — create `api/fetch-video.ts`: receives YouTube URL/ID; calls YouTube Data API v3; returns `{ title_en, title_ko, duration, thumbnail_url, upload_date }`; requires `YOUTUBE_API_KEY`
- [ ] 12.3 — create `api/fetch-playlist.ts`: receives YouTube playlist URL/ID; calls YouTube Data API v3; returns array of video metadata objects
- [ ] 12.4 — create `api/ingest.ts`: receives fetched metadata plus catalog metadata (`category`, `playlist`, `season`, `member_tags`); writes to Supabase using `SUPABASE_SERVICE_ROLE_KEY`
- [ ] 12.5 — create `api/sync.ts`: query `h2h_playlists` where `sync_enabled = true`; fetch only the 3 most recent videos from each connected YouTube playlist; compare by `youtube_id`; insert only missing videos into `h2h_videos`; no scheduling logic (cron-job.org invokes this endpoint)

- [ ] 12.6 — create `src/pages/admin/components/LoginForm.tsx`: centered password card; submits to `/api/auth`; access controlled via server session cookie

- [ ] 12.7 — create `src/pages/admin/components/IngestSingle.tsx`: YouTube URL input → `/api/fetch-video`; display metadata preview; form with category dropdown, playlist dropdown, optional season, member checklist (8 members + "all members"); save → `/api/ingest`

- [ ] 12.8 — create `src/pages/admin/components/IngestPlaylist.tsx`: YouTube playlist URL → `/api/fetch-playlist`; display all fetched videos; bulk assign category, playlist, season, member tags with optional per-video overrides; save all → `/api/ingest`

- [ ] 12.9 — create `src/pages/admin/components/VideoManager.tsx`: searchable table of all videos; filter by category, playlist, member; inline edit metadata; delete with confirmation

- [ ] 12.10 — create `src/pages/admin/components/PlaylistManager.tsx`: CRUD playlists and categories; manual `sort_order`; configure optional `youtube_playlist_id`; toggle `sync_enabled` (official playlists only)

- [ ] 12.11 — create `src/pages/admin/index.tsx`: login gate (renders `<LoginForm />` until authenticated); tabbed interface (batch ingestion / single video / videos / playlists)

- [ ] 12.12 — update `src/App.tsx`: add `/admin` route inside `<Layout>`

- [ ] 12.13 — configure environment variables:
  - `ADMIN_PASSWORD`
  - `YOUTUBE_API_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`

- [ ] 12.14 — configure `cron-job.org` to call `/api/sync` on the desired schedule

- [ ] 12.15 — verify:
  - `npm run build`
  - single video ingestion
  - playlist ingestion
  - playlist CRUD
  - official playlist sync inserts only newly published videos
  - music and variety playlists remain manual
  - deploy to Vercel

---

## phase 13 — content drops
*data-only. no code changes.*

- [ ] 13.1 — ingest era 1 official content via admin dashboard
- [ ] 13.2 — ingest era 1 music videos
- [ ] 13.3 — ingest era 1 variety & guestings
- [ ] 13.4 — verify all videos appear in catalog with correct thumbnails, durations, and member tags; deploy

---

## phase 14 — search

- [ ] 14.1 — create `src/hooks/useSearch.ts`: debounced (300ms) `ilike` query on `title_en` against supabase `videos` table; returns `{ results, loading, empty }`
- [ ] 14.2 — create `src/components/common/Search.tsx`: fixed overlay (`z-[70]`); entrance — mount with `opacity:0 translateY(-100%)`, next rAF transition to `opacity:1 translateY(0)` over 400ms `cubic-bezier(0.16, 1, 0.3, 1)`; exit reverses then unmounts; backdrop click and escape key close; auto-focused input styled with `border-[var(--color-primary)] shadow-glow`; results in 2-column `<VideoCard>` grid; 4 shimmer skeleton cards on loading; empty state ("no videos found 😢"); `Cmd/Ctrl+K` shortcut to open
- [ ] 14.3 — wire navbar search pill in both `Navbar.tsx` and `LandingNavbar.tsx` to open `<Search>` overlay; manage open state via lightweight context or lifted state in `main.tsx`
- [ ] 14.4 — verify: `npm run build` passes; entrance/exit animation smooth; escape close and backdrop click work; keyboard shortcut works; results click through to player; deploy to vercel

---

## phase 15 — member filters

- [ ] 15.1 — update `src/hooks/useSearch.ts`: accept `memberFilters: string[]`; add `@>` (contains) filter on `member_tags` when non-empty; combine with existing title `ilike`
- [ ] 15.2 — update `src/components/common/Search.tsx`: add member filter chip row below input — 8 pill buttons (emoji + name); inactive: `bg-[var(--color-bg-alt)] border border-[var(--color-border)]`; active: `bg-[${colorHex}20] border border-[${colorHex}60] text-[${colorHex}]`; multiple selection allowed; clear-all button when any active; pass selected members into `useSearch`
- [ ] 15.3 — verify: `npm run build` passes; chips toggle correctly; combined title + member filter returns correct results; clear-all resets state; deploy to vercel

---

## phase 16 — recently added

- [ ] 16.1 — create `src/hooks/useRecentVideos.ts`: fetch 8 most recent videos ordered by `created_at desc`; returns `{ videos, loading }`
- [ ] 16.2 — create `src/pages/catalog/components/RecentlyAdded.tsx`: "recently added" section heading; horizontally scrollable row of 8 `<VideoCard>` components; scroll arrows (same show/hide pattern as members carousel but smaller); `useRecentVideos` for data
- [ ] 16.3 — update `src/pages/catalog/index.tsx`: add `<RecentlyAdded>` above `<CategoryNav>`
- [ ] 16.4 — verify: `npm run build` passes; section shows 8 most recent videos; scroll arrows show/hide correctly; deploy to vercel

---

## phase 17 — dark mode

- [ ] 17.1 — add `[data-theme="dark"]` block to `src/index.css` with all color variable overrides (bg, surface, primary variants, text, border, shadow)
- [ ] 17.2 — create `src/hooks/useTheme.ts`: reads `localStorage` → falls back to `prefers-color-scheme`; toggles `data-theme` on `<html>`; persists to `localStorage`
- [ ] 17.3 — update `Navbar.tsx` and `LandingNavbar.tsx`: add sun/moon toggle icon button wired to `useTheme`
- [ ] 17.4 — verify: `npm run build` passes; toggle switches theme instantly with no flash; preference persists on reload; system preference respected on first visit; visual review of all pages in dark mode at 375px and 1440px; deploy to vercel

---

## phases 18–25 — member profiles
*one phase per member. design defined at phase start.*

- [ ] 18.1 — scaffold `src/pages/members/[slug]/index.tsx` dynamic route; update `src/App.tsx` to add `/members/:slug` inside `<Layout>`
- [ ] 18.2 — build Jiwoo profile page (`/members/jiwoo`): design TBD at phase start; verify build; deploy; update `roadmap.ts` status to `shipped`
- [ ] 19.1 — build Carmen profile page (`/members/carmen`); verify build; deploy; update `roadmap.ts`
- [ ] 20.1 — build Yuha profile page (`/members/yuha`); verify build; deploy; update `roadmap.ts`
- [ ] 21.1 — build Stella profile page (`/members/stella`); verify build; deploy; update `roadmap.ts`
- [ ] 22.1 — build Juun profile page (`/members/juun`); verify build; deploy; update `roadmap.ts`
- [ ] 23.1 — build A-Na profile page (`/members/a-na`); verify build; deploy; update `roadmap.ts`
- [ ] 24.1 — build Ian profile page (`/members/ian`); verify build; deploy; update `roadmap.ts`
- [ ] 25.1 — build Ye-On profile page (`/members/ye-on`); verify build; deploy; update `roadmap.ts`

---

## phase 26 — language support

- [ ] 26.1 — create `src/hooks/useLanguage.ts`: `en`/`ko` toggle; persists in `localStorage`; export context + provider
- [ ] 26.2 — update `src/main.tsx`: wrap `<App>` with language context provider
- [ ] 26.3 — update all video display components (`VideoCard`, `VideoGrid`, `Search`) to conditionally render `title_en` or `title_ko` based on language context
- [ ] 26.4 — create UI string key-value map for all static text (nav links, page headers, labels, empty states); apply throughout
- [ ] 26.5 — add language toggle button to `Navbar.tsx` and `LandingNavbar.tsx`
- [ ] 26.6 — verify: `npm run build` passes; toggle switches language for all dynamic and static text; preference persists on reload; deploy to vercel

---

## standing rules

- run `npm run build` and `npm run lint` after every phase before deploying
- visual review at 375px, 768px, 1440px before every production deploy
- use vercel preview deploys before promoting to production
- update `src/data/roadmap.ts` phase statuses as each phase ships