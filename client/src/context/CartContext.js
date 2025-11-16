import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCart({ items: [], totalPrice: 0 });
    }
  }, [user]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/cart');
      setCart(res.data.data);
    } catch (error) {
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true);
      const res = await axios.post('/api/cart', { productId, quantity });
      setCart(res.data.data);
      toast.success('Item added to cart');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add item to cart');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/cart/${productId}`);
      setCart(res.data.data);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item from cart');
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      setLoading(true);
      const res = await axios.put(`/api/cart/${productId}`, { quantity });
      setCart(res.data.data);
      toast.success('Cart updated');
    } catch (error) {
      toast.error('Failed to update cart');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => {
    setCart({ items: [], totalPrice: 0 });
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      removeFromCart,
      updateCartItem,
      clearCart,
      loadCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
