import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/landing-page";
import ComingSoon from "./pages/coming-soon";
import RoadmapPage from "./pages/roadmap";
import AboutPage from "./pages/about";
import ScrollToTop from "./components/common/ScrollToTop";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route element={<Layout />}>
          <Route path="/catalog/*" element={<ComingSoon />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<ComingSoon />} />
        </Route>
      </Routes>
    </>
  );
}