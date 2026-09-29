import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { MenuItem } from "../data/menu";

type CartLine = MenuItem & { quantity: number };
type CartContextValue = {
  lines: CartLine[];
  add: (item: MenuItem) => void;
  decrement: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  total: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const add = (menuItem: MenuItem) => setLines((current) => {
    const existing = current.find((line) => line.id === menuItem.id);
    return existing
      ? current.map((line) => line.id === menuItem.id ? { ...line, quantity: line.quantity + 1 } : line)
      : [...current, { ...menuItem, quantity: 1 }];
  });
  const decrement = (id: string) => setLines((current) => current.flatMap((line) => line.id !== id ? [line] : line.quantity > 1 ? [{ ...line, quantity: line.quantity - 1 }] : []));
  const remove = (id: string) => setLines((current) => current.filter((line) => line.id !== id));
  const value = useMemo(() => ({ lines, add, decrement, remove, clear: () => setLines([]), count: lines.reduce((sum, line) => sum + line.quantity, 0), total: lines.reduce((sum, line) => sum + line.price * line.quantity, 0) }), [lines]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
