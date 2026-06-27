import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/landing-page";
import ComingSoon from "./pages/coming-soon";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route element={<Layout />}>
        <Route path="/catalog/*" element={<ComingSoon />} />
        <Route path="/roadmap" element={<ComingSoon />} />
        <Route path="/about" element={<ComingSoon />} />
        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  );
}