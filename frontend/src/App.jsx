import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { Routes, Route, useNavigate, Link } from 'react-router-dom';

function Home() {
  
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    if (!token) {
      setAuthLoading(false);
      return;
    }
    
    fetch("http://127.0.0.1:8000/api/user", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(async (response) => {
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error("Nevažeći token.");
      }
      
      return data;
    })
    .then((data) => {
      setUser(data);
    })
    .catch(() => {
      localStorage.removeItem("token");
      setUser(null);
    })
    .finally(() => {
      setAuthLoading(false);
    });
  }, [token]);
  
  const handleLogout = () => {
    fetch("http://127.0.0.1:8000/api/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(async (response) => {
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Odjava nije uspela.");
      }
      
      return data;
    })
    .then((data) => {
      localStorage.removeItem("token");
      setUser(null);
    })
    .catch((error) => {
      alert(error.message);
    });
  };
  
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
  .then((response) => {
    if (!response.ok) {
      throw new Error("Greška pri učitavanju kategorija.");
    }
    
    return response.json();
  })
  .then((data) => {
    setCategories(data);
  })
  .catch((error) => {
    setError(error.message);
  });
}, []);

return (
  <div className="min-h-screen bg-gray-100 p-8">
  <div className="max-w-4xl mx-auto">
  <header className="header">
  <h1 className="text-4xl font-bold mb-8">
  Proizvodi i cene
  </h1>
  
  <div className="auth-links">
  {!authLoading && (user ? (
    <button className="auth-link-button" onClick={handleLogout}>
    Odjavi se
    </button>
  ) : (
    <>
    <Link className="auth-link-button" to="/login">
    Prijavi se
    </Link>
    
    <Link className="auth-link-button" to="/register">
    Registruj se
    </Link>
    </>
  ))}
  </div>
  </header>
  
  
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
  
  {error && <option>{error}</option>}
  {!error && categories.map((category) => (
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
  Po nazivu rastuće
  </option>
  
  <option value="name_desc">
  Po nazivu opadajuće
  </option>
  
  <option value="price_asc">
  Najniža cena
  </option>
  
  <option value="price_desc">
  Najviša cena
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

function App() {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    </Routes>
  );
}

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    setError("");
    
    fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    .then(async (response) => {
      const data = await response.json();
      
      if (!response.ok) {
        if (data.errors) {
          const firstError = Object.values(data.errors)[0][0];
          throw new Error(firstError);
        }
        
        throw new Error(data.message || "Prijava nije uspela.");
      }
      
      return data;
    })
    .then((data) => {
      localStorage.setItem("token", data.token);
      navigate("/");
    })
    .catch((error) => {
      setError(error.message);
    });
  };
  
  return (
    <div className="auth-container">
    <h2>Prijava</h2>
    
    <form onSubmit={handleSubmit}>
    <div className="form-group">
    <label>Email:</label>
    <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    />
    </div>
    
    <div className="form-group">
    <label>Lozinka:</label>
    <input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    />
    </div>
    
    <button type="submit" className="auth-button">Prijavi se</button>
    </form>
    
    {error && <p>{error}</p>}
    </div>
  );
}

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    setError("");
    
    fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      }),
    })
    .then(async (response) => {
      const data = await response.json();
      
      if (!response.ok) {
        if (data.errors) {
          const firstError = Object.values(data.errors)[0][0];
          throw new Error(firstError);        }
          
          throw new Error(data.message || "Registracija nije uspela.");
        }
        return data;
      })
      .then((data) => {
        alert(data.message);
        navigate("/login");
      })
      .catch((error) => {
        setError(error.message);
      });
    };
    
    return (
      <div className="auth-container">
      <h2>Registracija</h2>
      
      <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
      <label>Ime:</label>
      <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      />
      </div>
      
      <div className="form-group">
      <label>Email:</label>
      <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />
      </div>
      
      <div className="form-group">
      <label>Lozinka:</label>
      <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />
      </div>
      
      <div className="form-group">
      <label>Potvrda lozinke:</label>
      <input
      type="password"
      value={passwordConfirmation}
      onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      </div>
      
      <button type="submit" className="auth-button">Registruj se</button>
      </form>
      
      {error && <p>{error}</p>}
      </div>
    );
  }
  
  export default App;