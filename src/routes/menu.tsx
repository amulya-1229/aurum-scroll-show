import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { MenuItemRow } from "../components/menu-item";
import { menu } from "../data/menu";

export const Route = createFileRoute("/menu")({
  head: () => ({ meta: [
    { title: "Menu — Aurum" }, { name: "description", content: "Explore Aurum's complete Indian menu, from starters and curries to biryani, breads, desserts, and drinks." },
    { property: "og:title", content: "Menu — Aurum" }, { property: "og:description", content: "Seven sections of contemporary Indian cooking, ready to order." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: MenuPage,
});

function MenuPage() {
  const [query, setQuery] = useState("");
  const [diet, setDiet] = useState<"all" | "veg" | "nonveg">("all");
  const filtered = useMemo(() => menu.map((category) => ({ ...category, items: category.items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) && (diet === "all" || (diet === "veg" ? item.vegetarian : !item.vegetarian))) })).filter((category) => category.items.length), [query, diet]);
  return <><header className="page-hero page-width"><p className="eyebrow">Seven chapters · 30 dishes</p><h1 className="page-title">The menu</h1><p>Built in the exact progression of an Aurum meal. Search by name or refine by preference, then add dishes directly to your order.</p></header><div className="menu-tools page-width"><label className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search dishes" aria-label="Search menu" /></label><div className="segmented" aria-label="Dietary filter">{(["all","veg","nonveg"] as const).map((value) => <button key={value} onClick={() => setDiet(value)} className={diet === value ? "active" : ""}>{value === "all" ? "All" : value === "veg" ? "Vegetarian" : "Non-vegetarian"}</button>)}</div></div><div className="menu-index page-width">{filtered.map((category, index) => <section className="menu-category" key={category.name}><div className="category-title"><span>0{index + 1}</span><h2>{category.name}</h2></div><div>{category.items.map((item) => <MenuItemRow item={item} key={item.id} />)}</div></section>)}{filtered.length === 0 && <p className="empty-state">No dishes match your search.</p>}</div></>;
}
