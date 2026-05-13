import React from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  if (!product) return null;

  const { id, title, price, description, category, image, rating } = product;

  const {addToCart, cartItems} = useCart();

  // check if product is already in cart
  const productInCart = cartItems.find((item) => item.id === product.id);

  // add product quantity if already in cart
  const quantityLabel = productInCart ? ` (${productInCart.quantity || 1})` : "";


  function handleAddToCart() {
    addToCart(product);
  }

  return (
    <div className="max-w-sm rounded-2xl  shadow-md overflow-hidden border bg-white hover:shadow-xl transition duration-300">
      {/* Product Image */}
      <div className="h-64 flex items-center justify-center bg-gray-100 p-4">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <p className="text-sm text-gray-500 capitalize">
          {product.category}
        </p>

        <h2 className="text-lg font-semibold mt-1 line-clamp-2">
          {product.title}
        </h2>

        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">⭐</span>
            <span className="text-sm font-medium">
              {product.rating?.rate}
            </span>
            <span className="text-xs text-gray-500">
              ({product.rating?.count} reviews)
            </span>
          </div>

          <p className="text-xl font-bold text-green-600">
            ${product.price}
          </p>
        </div>

        {/* Button */}
        <button className="w-full mt-4 bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition" onClick={handleAddToCart}>
          Add to Cart {quantityLabel}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;







