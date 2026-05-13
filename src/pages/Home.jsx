import React from "react";

import { useProducts } from "../Queries/DataQueries.js";
import ProductCard from "../components/ProductCard.jsx";
import { Link } from "react-router-dom";

const Home = () => {
  const { prd, isPending, error } = useProducts();

  console.log(prd);

  // Loading State
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading amazing products...
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
        Something went wrong while fetching products.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Hero Section */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to ShopHub
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Our Products
          </h2>

          <p className="text-gray-500">
            {prd?.length} Products Available
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {prd?.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <ProductCard
                key={product.id}
                product={product}
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;