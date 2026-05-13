import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { PetDetail } from '../api/petsApi';

interface CartContextType {
  cart: PetDetail[];
  addToCart: (pet: PetDetail) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<PetDetail[]>([]);

  const addToCart = (pet: PetDetail) => {
    // Check if pet is already in cart to prevent duplicates
    if (!cart.find(p => p.id === pet.id)) {
      setCart([...cart, pet]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, cartCount: cart.length }}>
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
