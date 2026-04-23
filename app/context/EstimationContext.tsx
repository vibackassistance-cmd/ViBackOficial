import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../data/products';

export interface EstimationItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

interface EstimationContextType {
  items: EstimationItem[];
  addItem: (product: Product, quantity?: number, selectedSize?: string) => void;
  removeItem: (productId: number, selectedSize?: string) => void;
  updateQuantity: (productId: number, quantity: number, selectedSize?: string) => void;
  clearItems: () => void;
  getTotalItems: () => number;
}

const EstimationContext = createContext<EstimationContextType | undefined>(undefined);

export function EstimationProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<EstimationItem[]>([]);

  const addItem = (product: Product, quantity: number = 1, selectedSize?: string) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.product.id === product.id && item.selectedSize === selectedSize
      );
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity, selectedSize }];
    });
  };

  const removeItem = (productId: number, selectedSize?: string) => {
    setItems(prevItems => prevItems.filter(item => 
      !(item.product.id === productId && item.selectedSize === selectedSize)
    ));
  };

  const updateQuantity = (productId: number, quantity: number, selectedSize?: string) => {
    if (quantity <= 0) {
      removeItem(productId, selectedSize);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId && item.selectedSize === selectedSize 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearItems = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <EstimationContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearItems, getTotalItems }}
    >
      {children}
    </EstimationContext.Provider>
  );
}

export function useEstimation() {
  const context = useContext(EstimationContext);
  if (context === undefined) {
    throw new Error('useEstimation must be used within an EstimationProvider');
  }
  return context;
}