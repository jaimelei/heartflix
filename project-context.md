# h2h — project context

## overview

h2h is a fan-made video catalog website dedicated to hearts2hearts (하츠투하츠), an eight-member k-pop girl group under sm entertainment. the group debuted on february 24, 2025, and consists of jiwoo, carmen, yuha, stella, juun, a-na, ian, and ye-on.

the website is not an official platform. it is built by a fan, for fans — a dedicated space to browse, discover, and watch hearts2hearts video content organized in a way that youtube alone does not offer.

the site stores no video files. it stores only metadata. videos are streamed directly from youtube via an iframe embed player. the website is a presentation and catalog layer, not a media server.

---

## the group

hearts2hearts, stylized as h2h, is sm entertainment's first new girl group since aespa debuted in 2020. with eight members, it is sm's largest girl group since girls' generation. the group's name symbolizes connecting hearts across the world through music filled with various emotions and heartfelt messages.

their official fandom color is sky blue. their fandom name is s2u (하츄). their official mascot is falabella.

the group's energy is best described as fresh, bubbly, energetic, and full of personality — eight members with distinctly different charms that together create a chaotic, lovable dynamic. their discography ranges from mysterious and dreamy (the chase) to upbeat and self-confident (style, rude!) to summery and playful (lemon tang). they are one of the most promising rookie acts of 2025, having won multiple rookie awards at major year-end ceremonies.

members and their representative emojis:
- jiwoo 🍓 — leader, dancer, visual. shy but disciplined. former ballerina.
- carmen 🌴 — main vocalist. indonesian. known as the "sunshine" and "happy virus."
- yuha 🐰 — all-rounder. disney fan. perfect pitch. has a twin sister.
- stella 🧁 — korean-canadian. enfp. plays guitar, drums, and piano.
- juun — "super cutie." husky voice. huge boa fan.
- a-na — "firecracker." loves pastels. tallest member. anime fan.
- ian — scouted via instagram. former kid model. natural charm.
- ye-on — youngest. musical theater background. most active in the group chat.

---

## design direction

the website should feel playful, warm, and full of personality — a digital space that reflects the group's fun and energetic identity without being visually chaotic. the group's identity is chaotic and lovable; the website channels that energy through color, type, and personality — not through disorganized layouts or unpredictable structure.

the aesthetic leans into pastel colors, rounded and friendly typography, and a light, airy feel. the group's official sky blue is the anchor color, complemented by a pastel palette that feels youthful and expressive without being childish.

every element on this site should have a personality behind it. nothing should feel like a default. nothing should feel like it was placed there because it was the obvious choice. this is a fan project built with love and intention — it should look like it.

**this is not:**
- a saas product
- an e-commerce platform
- a corporate website
- a generic k-pop fan site template
- a dashboard
- a media streaming platform trying to look like netflix or spotify
- a startup landing page

**this is:**
- a love letter to hearts2hearts built by a fan
- a playful, warm, and expressive catalog
- something that feels handcrafted and intentional
- a space that reflects the group's bubbly, energetic, lovable identity

**typography:**
- display / hero: gasoek one — used for large, impactful moments only. headlines, hero titles. bold and characterful.
- all other text: fredoka — friendly, rounded, highly readable. used for headers, body, ui copy, labels, everything else. size and weight variations within fredoka create the typographic hierarchy. no third font.

**conventions:**
- all ui text is lowercase. this is intentional and consistent throughout the entire interface — labels, buttons, headings, nav items, everything. it contributes to the friendly, casual, approachable personality of the site.

**color:**
- official group color: sky blue — this is the palette anchor.
- the palette should extend into complementary pastels. pastel colors should feel cohesive across light mode and be architected to support dark mode later without a full redesign. in light mode, pastels function as background and surface colors, with saturated versions of the same hues as accents. this inversion will apply in dark mode when it is implemented.
- no neon. no heavy saturation. the energy comes from composition and type, not screaming colors.

**mood:** cheerful. inviting. fan-made with love. feels like it was built by someone who genuinely cares about the group.

**dark mode:** planned as a later roadmap phase. the codebase and design tokens should be structured from the start to accommodate it — css variables, theme-aware tokens — so that dark mode can be layered in without a full rebuild. light mode is built first.

---

## tech stack

**frontend**
- react
- typescript
- vite
- react router

**hosting**
- vercel hobby (free)

**database**
- supabase postgresql
- supabase client sdk (frontend reads only)
- metadata only — no video files, no image files

**authentication**
- admin access is protected by a simple environment variable password comparison
- the admin password is stored as a vercel environment variable
- on login, the entered password is compared against the env variable
- this is intentionally simple — it is a deterrent from accidental public access, not a security system
- rls (row level security) on supabase ensures the frontend can only read; all writes go through the admin dashboard which uses the supabase service role key server-side
- public users: read-only access via supabase anon key
- no user accounts, no sign-up, no profiles

**video**
- youtube embed player (iframe)
- videos streamed directly from youtube
- no self-hosted video

**youtube api**
- youtube data api v3
- used exclusively in the admin dashboard for metadata ingestion
- never called at runtime by public users
- api quota is never consumed by visitor traffic

**sync infrastructure**
- vercel serverless function at /api/sync handles sync logic
- cron-job.org calls /api/sync on a schedule to trigger automatic syncing of live playlists
- github actions is used only as a workflow runner when needed, not as a scheduler
- sync is not scheduled via github actions

**cost philosophy**
- free-first architecture
- near-zero operating cost
- heavy resources delegated to youtube and supabase
- designed to support hundreds or thousands of users with minimal overhead

---

## architecture

supabase acts as a metadata cache and presentation layer. it is not authoritative over content — the youtube channel remains the source of truth.

supabase stores:
- youtube_id
- title_en (english title — default display language)
- title_ko (korean title — stored now, used later for language support)
- duration
- thumbnail url
- upload date
- category
- playlist
- season (if applicable)
- member tags (array of member names featured in the video)
- ordering information

both english and korean titles are fetched from the youtube api at ingestion time and stored separately. the site displays english titles by default. korean titles are stored in anticipation of a future multilingual feature and will not be surfaced in the ui until that roadmap phase.

the frontend communicates directly with supabase. there is no traditional backend, no express server, no vps.

---

## application structure

the application consists of the following pages and states. structure and layout decisions are left to opus — what is documented here is what exists and what it does, not how it looks.

### coming soon (ui state, not a page)
not a phase. a persistent ui state that applies to any page linked in the navbar that has not been built yet. when a user navigates to an unbuilt page, they see a coming soon screen. this is present throughout the entire development lifecycle — as new pages go live, the coming soon state is replaced. it should feel intentional, not like a broken page.

### landing page
the public entry point of the project. contains:
- navbar (links to pages, some will show coming soon state early on)
- hero section — includes live stats: total number of videos in the database and number of days the site has been running
- features section — brief overview of what the site offers
- members showcase — cards for each of the eight members (jiwoo, carmen, yuha, stella, juun, a-na, ian, ye-on). cards will be clickable in the future to navigate to member profiles. for now they are display only.
- platform preview — a visual/mood preview of what the catalog looks like
- cta section — links to the twitter and tiktok community accounts, and a donation link
- footer

### roadmap page
a public-facing roadmap showing the development phases of the site. this exists so that visitors can see what has been built and what is coming. it reinforces the "indie dev building this over time" narrative and gives the community something to follow and get excited about.

### about page
context about the project — what h2h is, who built this, and why. gives first-time visitors arriving from social media the context they need to understand and trust the site.

### catalog page
the main functional page of the site. it is the heart of the product.

the catalog has a hero section at the top — visual and mood focused, not functional. it contains a title, a tagline or short description, and the same live stats as the landing page hero (total videos, days running). no featured videos here.

below the hero, the catalog is organized by category. there are three categories:

1. **official content** — mirrors hearts2hearts' actual youtube playlists. this category reflects official sm/h2h content organization. specific playlists will be determined and named during development.

2. **music** — organized by release. each album, ep, or single is its own playlist. reflects the group's discography chronologically.

3. **variety & guestings** — curated by the admin. content added progressively by era, starting from the most recent.

each category contains playlists. each playlist contains videos.

**season logic:**
some playlists may have multiple seasons (e.g., a series that ran across multiple years or batches). the display behavior differs based on whether seasons exist:

- multiple seasons: the playlist shows a collection of seasons rather than individual videos. clicking a season opens a modal listing the videos inside that season. clicking a video opens the global player as usual.
- single season (or no seasons): videos are listed directly without an intermediate season step. clicking a video opens the global player as usual.

the catalog page should have some form of navigation between categories and playlists. since this is a react spa, how this navigation is structured — tabs, sidebar, url-based, scroll-based — is left for opus to ideate.

### search
title-based search across all videos in the catalog. search is global — it is not scoped to a category or playlist. a later roadmap phase adds member tag filtering.

search behavior is modeled after the ios dynamic island — it smoothly descends from the top of the screen when activated and smoothly ascends back up when dismissed. it does not occupy permanent screen space. it is an overlay experience, not a page.

implementation reference (behavior only, not design tokens): the search component uses a visibility + animation state pattern. when opened, it becomes visible and an animation class is applied on the next frame to trigger a css transition. when closed, the animation is reversed and the component is removed from the dom after the transition completes. it is a full-screen overlay with a backdrop. the input is auto-focused on open. escape key closes it. results are displayed as a grid of video cards. loading and empty states exist.

### member profiles
individual pages for each member. built one at a time, oldest to youngest: jiwoo → carmen → yuha → stella → juun → a-na → ian → ye-on. the content and layout of member profiles is to be ideated later — this section will be designed as its own phase when the time comes.

---

## global components

### video player
the video player is a global component, not a page. it persists across navigation and must not remount when minimized or restored.

**critical technical constraint:** there must be only one iframe instance in the entire application. do not use two iframe components that toggle visibility between full and mini states — this causes the video to remount and restart every time the player is minimized or restored. the single iframe must animate between its full and mini positions using a flip animation technique (record position before state change, apply inverse transform, then animate to identity).

player states:
- full: centered modal-style overlay with video metadata (title, upload date) and controls (minimize, close).
- mini: a small persistent player anchored to a corner of the screen (bottom left or bottom right — opus to decide) with the video title and a close button. the user can continue browsing the catalog while the video plays in mini mode.
- closed: player is not rendered.

clicking the mini player restores it to full. the backdrop is only visible in full mode. navigation must not interrupt playback.

implementation reference (behavior and structure only, not design tokens): the player uses a flip animation on the iframe wrapper div. before the minimized state changes, the current bounding rect is captured. after the dom updates, the new rect is captured. the difference is applied as an inverse css transform, which is then transitioned to identity. this produces a smooth positional animation with a single persistent iframe. mini mode dimensions are fixed pixel values. full mode is centered using css transforms or absolute positioning.

---

## admin dashboard

the admin dashboard is a separate, authenticated section of the application. it is not part of the public roadmap. it is the internal tool through which all video metadata is ingested into supabase and live playlists are synced.

access is protected by a simple password comparison against an environment variable. no user accounts, no supabase auth, no hashing — just a deterrent.

the admin dashboard has two main functions:

### 1. video ingestion
used for one-time or historical content that does not need to be synced automatically. the admin chooses between two ingestion modes:

**single video**
the admin pastes a single youtube video url. the app calls the youtube data api v3 to fetch metadata (english title, korean title, duration, thumbnail, upload date). the admin then:
- selects a category (official content, music, variety & guestings)
- selects or creates a playlist within that category
- optionally assigns a season
- tags which members appear in the video (multi-select checklist: jiwoo, carmen, yuha, stella, juun, a-na, ian, ye-on — or all members)
- confirms and saves to supabase

**playlist**
the admin pastes a youtube playlist url. the app fetches all videos in that playlist and their metadata in bulk (english title, korean title, duration, thumbnail, upload date). the admin then assigns category, playlist, season, and member tags — either globally for the entire batch or per video. confirms and saves all to supabase.

both modes fetch both english and korean titles at ingestion time and store them separately in the database.

the admin dashboard also includes:
- a view of all ingested videos with the ability to edit or delete entries
- category and playlist management (create, rename, reorder, delete)
- season management within playlists

### 2. manual sync
for live playlists that are connected and receive ongoing updates, the admin dashboard provides a manual sync button per playlist. each connected playlist has its own dedicated sync button. pressing it triggers a call to /api/sync for that playlist, which fetches the latest videos from youtube and updates supabase accordingly.

the specific playlists that will be connected for live sync are not defined yet — they will be determined during development.

automatic sync is handled by cron-job.org calling the /api/sync vercel serverless function on a schedule. manual sync and automatic sync share the same underlying sync logic — no duplicate pipelines.

the admin dashboard does not need to be visually elaborate. it is a functional internal tool. clarity and efficiency matter more than aesthetic.

---

## public roadmap

the following is the agreed public roadmap. this is distinct from development phases.

**development phases** are internal — how the developer structures the build process (e.g., building the hero section before the features section, setting up supabase before building the catalog). these are not communicated publicly.

**the public roadmap** is what is announced to the community. each phase represents a user-facing feature or content milestone that is shipped and announced. it is the basis for community updates, polls, and donation context.

```
phase 1  — landing page (hero with live stats, features, members showcase, platform preview, community & donation cta)
phase 2  — roadmap page
phase 3  — about page
phase 4  — catalog: official content + video player
phase 5  — catalog: music
phase 6  — catalog: variety & guestings (lemon tang era)
phase 7  — catalog: variety & guestings (rude! era)
phase 8  — catalog: variety & guestings (focus era)
phase 9  — catalog: variety & guestings (style era)
phase 10 — catalog: variety & guestings (the chase era)
phase 11 — catalog: variety & guestings (pre-debut)
phase 12 — title search
phase 13 — member filters
phase 14 — recently added section
phase 15 — dark mode
phase 16 — member profiles (jiwoo)
phase 17 — member profiles (carmen)
phase 18 — member profiles (yuha)
phase 19 — member profiles (stella)
phase 20 — member profiles (juun)
phase 21 — member profiles (a-na)
phase 22 — member profiles (ian)
phase 23 — member profiles (ye-on)
phase 24 — language support (korean)
```

variety era drops are added one at a time starting from the most recent era (lemon tang) and working backward chronologically to pre-debut. each era drop is its own announcement moment.

member profiles are built one at a time from oldest to youngest. the content and design of individual member profile pages will be ideated when that phase begins.

phase 24 introduces korean language support, surfacing the korean titles already stored in the database from ingestion. the infrastructure for this is built from day one — the ui toggle and localization layer are what phase 24 delivers.

future features beyond phase 24 are not defined. they will be shaped by the community that forms around the project.
