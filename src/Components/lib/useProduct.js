import { useEffect, useState } from "react";
import { getNewArrivals } from "./api";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const data = await getNewArrivals();

        if (active) {
          setProducts(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Products load nahi ho sake.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  return { products, loading, error };
}
