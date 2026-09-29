import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useCart } from "../context/cart";
import { Button } from "./button";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/reservations", label: "Reservations" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  return <div className="site-frame">
    <header className="site-header">
      <div className="nav-inner">
        <Link to="/" className="brand-mark" aria-label="Aurum home"><span className="brand-dot" /><span>Aurum</span></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">{links.map((link) => <Link key={link.to} to={link.to} activeOptions={{ exact: link.to === "/" }} activeProps={{ className: "nav-link-active" }} className="nav-link">{link.label}</Link>)}</nav>
        <div className="nav-actions">
          <Button asChild variant="ghost" className="account-link"><Link to="/account">Account</Link></Button>
          <Button asChild variant="outline" className="cart-link"><Link to="/order"><ShoppingBag size={16} /><span>Order</span>{count > 0 && <span className="cart-count">{count}</span>}</Link></Button>
          <Button asChild className="reserve-link"><Link to="/reservations">Reserve</Link></Button>
          <Button variant="icon" className="menu-trigger" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {open && <nav className="mobile-nav" aria-label="Mobile navigation">{links.map((link) => <Link key={link.to} to={link.to} onClick={() => setOpen(false)}>{link.label}</Link>)}<Link to="/account" onClick={() => setOpen(false)}>Account</Link><Link to="/order" onClick={() => setOpen(false)}>Order · {count}</Link></nav>}
    </header>
    <main>{children}</main>
    <footer className="site-footer"><div><Link to="/" className="footer-brand">Aurum</Link><p>Contemporary Indian dining</p></div><p>Open daily · 12–3 &amp; 7–11</p><div className="footer-links"><Link to="/menu">Menu</Link><Link to="/reservations">Reservations</Link><Link to="/contact">Contact</Link></div></footer>
  </div>;
}
