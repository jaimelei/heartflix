import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Category } from "../types";

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCategories() {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from("h2h_categories")
                .select("*")
                .order("sort_order", { ascending: true });

            if (error) {
                setError(error.message);
                setCategories([]);
            } else {
                setCategories(data ?? []);
            }

            setLoading(false);
        }

        fetchCategories();
    }, []);

    return {
        categories,
        loading,
        error,
    };
}