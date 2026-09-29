import { Plus } from "lucide-react";
import type { MenuItem as MenuItemType } from "../data/menu";
import { useCart } from "../context/cart";
import { Button } from "./button";

export function MenuItemRow({ item }: { item: MenuItemType }) {
  const { add } = useCart();
  return <article className="menu-row"><div className={item.vegetarian ? "diet-mark veg" : "diet-mark nonveg"}><span /></div><div className="menu-copy"><div><h3>{item.name}</h3><div className="menu-tags"><span>{item.vegetarian ? "Vegetarian" : "Non-vegetarian"}</span><span>{item.spice}</span></div></div><strong>₹{item.price}</strong></div><Button variant="icon" onClick={() => add(item)} aria-label={`Add ${item.name} to order`} title={`Add ${item.name}`}><Plus size={17} /></Button></article>;
}
