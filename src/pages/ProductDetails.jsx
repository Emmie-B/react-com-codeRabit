import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../Queries/DataQueries.js";
import { useCart } from "../context/CartContext.jsx";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { prd, isPending, error } = useProducts();

  // Loading
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading product...
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load product
      </div>
    );
  }

  // Find product by id
  const product = prd?.find((p) => p.id === Number(id));


  // hasndle add to cart
    const {addToCart, cartItems} = useCart();

  // check if product is already in cart
  const productInCart = cartItems.find((item) => item.id === product.id);

  // add product quantity if already in cart
  const quantityLabel = productInCart ? ` (${productInCart.quantity || 1})` : "";


  function handleAddToCart() {
    addToCart(product);
  }


  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold">Product not found</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-black text-white rounded-xl"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Image */}
        <div className="flex items-center justify-center bg-gray-50 rounded-xl p-6">
          <img
            src={product.image}
            alt={product.title}
            className="h-80 object-contain"
          />
        </div>

        {/* Details */}
        <div>
          <p className="text-sm text-gray-500 capitalize">
            {product.category}
          </p>

          <h1 className="text-2xl font-bold mt-2">
            {product.title}
          </h1>

          <div className="flex items-center gap-3 mt-4">
            <span className="text-yellow-500">
              ⭐ {product.rating?.rate}
            </span>
            <span className="text-gray-500 text-sm">
              ({product.rating?.count} reviews)
            </span>
          </div>

          <p className="text-3xl font-bold text-green-600 mt-6">
            ${product.price}
          </p>

          <p className="mt-6 text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Actions */}
          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition" onClick={handleAddToCart}>
              Add to Cart
            </button>

            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 border rounded-xl hover:bg-gray-100 transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;