import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/common/ScrollToTop";

import HomePage from "./pages/landing-page";
import CatalogPage from "./pages/catalog";
import PlaylistGrid from "./pages/catalog/components/PlaylistGrid";
import PlaylistView from "./pages/catalog/components/PlaylistView";
import AboutPage from "./pages/about";
import RoadmapPage from "./pages/roadmap";
import ComingSoon from "./pages/coming-soon";
import AdminPage from "./pages/admin";

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route element={<Layout />}>
          <Route path="/catalog" element={<CatalogPage />}>
            {/* Official Content */}
            <Route index element={<PlaylistGrid />} />

            {/* Music */}
            <Route
              path="music"
              element={<PlaylistGrid />}
            />

            {/* Variety & Guestings */}
            <Route
              path="variety"
              element={<PlaylistGrid />}
            />

            {/* Playlist */}
            <Route
              path=":categorySlug/:playlistId"
              element={<PlaylistView />}
            />
          </Route>

          <Route
            path="/admin"
            element={<AdminPage />}
          />

          <Route
            path="/roadmap"
            element={<RoadmapPage />}
          />

          <Route
            path="/about"
            element={<AboutPage />}
          />

          <Route
            path="*"
            element={<ComingSoon />}
          />
        </Route>
      </Routes>
    </>
  );
}