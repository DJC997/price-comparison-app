import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products?search=${debouncedSearch}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }, [debouncedSearch]);

 return (
  <div className="min-h-screen bg-gray-100 p-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        Proizvodi i cene
      </h1>
      <input
  type="text"
  placeholder="Pretraži proizvode..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full p-3 mb-6 border rounded-lg"
/>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  </div>
);
}

export default App;