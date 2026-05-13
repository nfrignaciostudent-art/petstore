import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { PetDetail } from '../api/petsApi';

interface CartContextType {
  cart: PetDetail[];
  addToCart: (pet: PetDetail) => void;
  removeFromCart: (id: number) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<PetDetail[]>([]);

  const addToCart = (pet: PetDetail) => {
    if (!cart.find(p => p.id === pet.id)) {
      setCart([...cart, pet]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(p => p.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount: cart.length }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
