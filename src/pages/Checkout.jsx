import React from "react";

import { useCart } from "../context/CartContext.jsx";
export const Checkout = () => {
  const { cartItems, removeFromCart } = useCart();

  // Totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = 10;
  const tax = subtotal * 0.05;

  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Shopping Cart
          </h1>

          <p className="text-gray-500 mt-2">
            Review your items and proceed to checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm p-5 flex flex-col sm:flex-row gap-6"
              >
                
                {/* Product Image */}
                <div className="w-full sm:w-36 h-36 bg-gray-100 rounded-xl flex items-center justify-center p-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full object-contain"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <p className="text-2xl font-bold text-green-600">
                      $
                      {(item.price * item.quantity).toFixed(2)}
                    </p>

                    <button className="text-red-500 hover:text-red-600 font-medium" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-sm p-6 h-fit sticky top-10">
            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">
                  Subtotal
                </span>

                <span className="font-medium">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">
                  Shipping
                </span>

                <span className="font-medium">
                  ${shipping.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">
                  Tax
                </span>

                <span className="font-medium">
                  ${tax.toFixed(2)}
                </span>
              </div>

              <div className="border-t pt-4 flex items-center justify-between">
                <span className="text-lg font-bold">
                  Total
                </span>

                <span className="text-2xl font-bold text-green-600">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="w-full mt-8 bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition font-semibold">
              Proceed to Checkout
            </button>

            {/* Continue Shopping */}
            <button className="w-full mt-4 border border-gray-300 py-4 rounded-xl hover:bg-gray-100 transition font-medium">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;