import { createContext, useState, useContext } from 'react';
import {  toast } from 'react-toastify';

const  CartContext = createContext(null);

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);

    function addToCart(product) {
        const existingItem = cartItems.find((item) => item.id === product.id);
        if (existingItem) {
            // increase quantity if product already in cart
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                )
            );
        }else{

         setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
            toast.success('Product added to cart!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
             });
        }
    }

    function removeFromCart(productId) {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== productId)
        );

        toast.info('Product removed from cart.',
            {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }
        );
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}