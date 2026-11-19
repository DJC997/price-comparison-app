function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
    <h2 className="text-2xl font-bold mb-2">
    {product.name}
    </h2>
    
    <p className="text-gray-600 mb-4">
    Kategorija: {product.category.name}
    </p>
    
    <h3 className="text-lg font-semibold mb-2">
    Cene
    </h3>
    
    <div className="space-y-3">
    {[...product.prices]
    .sort((a, b) => Number(a.price) - Number(b.price)).map((price) => (
      <div
      key={price.id}
      className="border rounded-lg p-3"
      >
      <p>
      <span className="font-semibold">
      Prodavnica:
      </span>{" "}
      {price.store.name}
      </p>
      
      <p>
      <span className="font-semibold">
      Cena:
      </span>{" "}
      {price.price} RSD
      </p>
      
      <a
      href={price.product_url}
      target="_blank"
      className="text-blue-500 hover:underline"
      >
      Poseti
      </a>
      </div>
    ))}
    </div>
    </div>
  );
}

export default ProductCard;