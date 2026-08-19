import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(`http://127.0.0.1:8000/api/products?search=${debouncedSearch}&category=${selectedCategory}&sort=${sort}`)
    .then((response) => {if (!response.ok) {
        throw new Error("Greška pri učitavanju proizvoda.");
      }
      return response.json();
    })
    .then((data) => {
      setProducts(data);
    })
    .catch((error) => {
      setError(error.message);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [debouncedSearch, selectedCategory, sort]);
  
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories")
    .then((response) => response.json())
    .then((data) => {
      setCategories(data);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);
  
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
    <select
    value={selectedCategory}
    onChange={(e) =>
      setSelectedCategory(e.target.value)
    }
    className="w-full p-3 mb-6 border rounded-lg"
    >
    <option value="">
    Sve
    </option>
    
    {categories.map((category) => (
      <option
      key={category.id}
      value={category.id}
      >
      {category.name}
      </option>
    ))}
    </select>
    <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
    className="w-full p-3 mb-6 border rounded-lg"
    >
    <option value="">
    Podrazumevano
    </option>
    
    <option value="name_asc">
    Po nazivu rastuce
    </option>
    
    <option value="name_desc">
    Po nazivu opadajuce
    </option>
    
    <option value="price_asc">
    Najniza cena
    </option>
    
    <option value="price_desc">
    Najvisa cena
    </option>
    </select>
    
   {loading && <p>Učitavanje proizvoda...</p>}

{error && <p>{error}</p>}

{!loading && !error && products.length === 0 && (
  <p>Nema pronađenih proizvoda.</p>
)}

{!loading &&
  !error &&
  products.map((product) => (
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