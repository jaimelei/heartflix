// src/pages/catalog/index.tsx

import { Outlet } from "react-router-dom";
import CatalogHero from "./components/CatalogHero";
import CategoryNav from "./components/CategoryNav";

export default function CatalogPage() {
    return (
        <div>
            <CatalogHero />
            <CategoryNav />
            <Outlet />
        </div>
    );
}