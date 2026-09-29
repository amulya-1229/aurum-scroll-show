export type MenuItem = {
  id: string;
  name: string;
  price: number;
  vegetarian: boolean;
  spice: "Mild" | "Medium" | "Hot";
};

export type MenuCategory = { name: string; items: MenuItem[] };

const item = (id: string, name: string, price: number, vegetarian: boolean, spice: MenuItem["spice"]): MenuItem => ({ id, name, price, vegetarian, spice });

export const menu: MenuCategory[] = [
  { name: "Starters", items: [
    item("paneer-tikka", "Paneer Tikka", 260, true, "Medium"),
    item("hara-bhara-kebab", "Hara Bhara Kebab", 220, true, "Mild"),
    item("chicken-65", "Chicken 65", 280, false, "Hot"),
    item("tandoori-chicken", "Tandoori Chicken (half)", 340, false, "Medium"),
    item("veg-manchurian", "Veg Manchurian (dry)", 210, true, "Medium"),
  ]},
  { name: "Main course, vegetarian", items: [
    item("paneer-butter-masala", "Paneer Butter Masala", 290, true, "Mild"),
    item("dal-makhani", "Dal Makhani", 240, true, "Mild"),
    item("kadai-vegetable", "Kadai Vegetable", 230, true, "Medium"),
    item("malai-kofta", "Malai Kofta", 270, true, "Mild"),
    item("palak-paneer", "Palak Paneer", 260, true, "Mild"),
  ]},
  { name: "Main course, non-vegetarian", items: [
    item("butter-chicken", "Butter Chicken", 340, false, "Mild"),
    item("chicken-chettinad", "Chicken Chettinad", 330, false, "Hot"),
    item("mutton-rogan-josh", "Mutton Rogan Josh", 420, false, "Medium"),
    item("goan-fish-curry", "Fish Curry (Goan style)", 380, false, "Medium"),
  ]},
  { name: "Biryani and rice", items: [
    item("chicken-dum-biryani", "Hyderabadi Chicken Dum Biryani", 320, false, "Medium"),
    item("veg-biryani", "Hyderabadi Veg Biryani", 240, true, "Medium"),
    item("mutton-biryani", "Mutton Biryani", 420, false, "Medium"),
    item("jeera-rice", "Jeera Rice", 140, true, "Mild"),
  ]},
  { name: "Breads", items: [
    item("butter-naan", "Butter Naan", 50, true, "Mild"),
    item("garlic-naan", "Garlic Naan", 60, true, "Mild"),
    item("tandoori-roti", "Tandoori Roti", 30, true, "Mild"),
    item("laccha-paratha", "Laccha Paratha", 55, true, "Mild"),
  ]},
  { name: "Desserts", items: [
    item("gulab-jamun", "Gulab Jamun (2 pcs)", 90, true, "Mild"),
    item("rasmalai", "Rasmalai (2 pcs)", 120, true, "Mild"),
    item("double-ka-meetha", "Double Ka Meetha", 110, true, "Mild"),
    item("kulfi-falooda", "Kulfi Falooda", 140, true, "Mild"),
  ]},
  { name: "Beverages", items: [
    item("masala-chai", "Masala Chai", 40, true, "Mild"),
    item("lassi", "Sweet or Salted Lassi", 90, true, "Mild"),
    item("mango-lassi", "Mango Lassi", 110, true, "Mild"),
    item("fresh-lime-soda", "Fresh Lime Soda", 70, true, "Mild"),
  ]},
];

export const allMenuItems = menu.flatMap((category) => category.items);
