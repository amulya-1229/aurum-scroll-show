import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "../components/button";
import heroImage from "../assets/aurum-hero.jpg";
import paneerImage from "../assets/paneer-tikka.jpg";
import butterChickenImage from "../assets/butter-chicken.jpg";
import biryaniImage from "../assets/biryani.jpg";
import kulfiImage from "../assets/kulfi-falooda.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Aurum — Contemporary Indian Dining" },
    { name: "description", content: "Discover Aurum's contemporary Indian menu, order online, or reserve your table." },
    { property: "og:title", content: "Aurum — Contemporary Indian Dining" },
    { property: "og:description", content: "Jewel-toned Indian cooking, served in warm light." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

function Index() {
  const signatures = [
    { name: "Paneer Tikka", note: "Mint · ember · smoke", price: 260, image: paneerImage },
    { name: "Butter Chicken", note: "Tomato · fenugreek · cream", price: 340, image: butterChickenImage },
    { name: "Chicken Dum Biryani", note: "Saffron · mint · sealed pot", price: 320, image: biryaniImage },
    { name: "Kulfi Falooda", note: "Rose · pistachio · saffron", price: 140, image: kulfiImage },
  ];
  return (
    <>
      <section className="hero-section">
        <span className="floating-spice spice-one">✦</span><span className="floating-spice spice-two">●</span>
        <div className="hero-grid page-width">
          <div className="hero-copy reveal-up">
            <p className="eyebrow">Contemporary Indian dining</p>
            <h1>Jewel tones, plated in warm light.</h1>
            <p className="hero-lede">A sensory journey through emerald spice and sunset reduction, served against the stillness of dark stone.</p>
            <div className="hero-actions"><Button asChild><Link to="/reservations">Reserve a table</Link></Button><Button asChild variant="outline"><Link to="/menu">View the menu</Link></Button><span>Daily · 12–3 &amp; 7–11</span></div>
            <div className="review-line"><span><Star size={15} fill="currentColor" /><Star size={15} fill="currentColor" /><Star size={15} fill="currentColor" /><Star size={15} fill="currentColor" /><Star size={15} fill="currentColor" /></span><p>“An architectural approach to flavour.” — The Culinary Post</p></div>
          </div>
          <div className="hero-visual reveal-up delay-one"><div className="hero-image-wrap"><img src={heroImage} alt="Herb-crusted paneer with saffron sauce" width={1088} height={1360} /><div className="image-caption"><span>Featured</span><strong>Mint reduction & smoked paneer</strong></div></div></div>
        </div>
      </section>
      <section className="section page-width">
        <div className="section-heading"><div><p className="eyebrow">From the kitchen</p><h2>Chef’s selection</h2></div><Link to="/menu">Full menu <ArrowRight size={16} /></Link></div>
        <div className="signature-rail">{signatures.map((dish) => <article className="dish-card" key={dish.name}><img src={dish.image} alt={dish.name} loading="lazy" width={816} height={816} /><div><h3>{dish.name}</h3><p>{dish.note}</p><span>₹{dish.price}</span></div></article>)}</div>
      </section>
      <section className="story-band"><div className="page-width story-grid"><div><p className="eyebrow">The Aurum table</p><h2>Rooted in memory.<br /><em>Reframed for now.</em></h2></div><div><p>We follow Indian flavours from charcoal hearths to coastal kitchens, honouring each region while finding a clear, contemporary expression.</p><Button asChild variant="outline"><Link to="/about">Our story</Link></Button></div></div></section>
      <section className="section page-width"><div className="hours-panel"><div><p className="eyebrow">This week at Aurum</p><h2>Lunch, dinner, and a little theatre.</h2></div><div className="hours-list"><p><span>Lunch</span>12:00 — 15:00</p><p><span>Dinner</span>19:00 — 23:00</p><p><span>Sunday</span>All-day menu</p></div><Button asChild><Link to="/reservations">Find a table</Link></Button></div></section>
    </>
  );
}
