// 1. JSX — JavaScript XML => JSX lets you write HTML-looking markup directly inside JS.It's NOT html — it's syntax sugar that gets compiled to JS under the hood by Vite/Babel.

// Instead of this ❌
const card = document.createElement("div");
card.className = "product-card";
const title = document.createElement("h3");
title.textContent = "MacBook Pro M3";
card.appendChild(title);
document.getElementById("products-grid").appendChild(card);

// You can do this ✅ (JSX)
function ProductCard() {
  return (
    <div className="product-card">
      <h3>MacBook Pro M3</h3>
      <p>Ksh 185,000</p>
    </div>
  );
}
// JSX reads like the DOM tree you're building, instead of a sequence of imperative appendChild() calls.

// 2. React.createElement() => What JSX actually becomes. The JSX above compiles (via Babel/Vite) into this:
const productCardElement = React.createElement(
  "div",
  { className: "product-card" },
  React.createElement("h3", null, "MacBook Pro M3"),
  React.createElement("p", null, "Ksh 185,000"),
);

// The signature is: createElement(type, props, ...children):
//i. type — the tag name ("div", "h3") or a component
//ii. props — an object of attributes (or null if none)
//iii. children — whatever's nested inside it.
// JSX is just a nicer way to write nested createElement() calls.
// You never write createElement() by hand in real projects — JSX does it for you at build time.

//3. Rendering the root:
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));
root.render(<App />);

// document.getElementById("root") — grabs a real DOM node, usually a single empty <div id="root"></div> sitting in your index.html.
// createRoot(...) — tells React "manage everything inside this DOM node."
// root.render(<App />) — hands React your top-level component (<App />), and React converts that whole JSX tree into real DOM elements and injects them inside #root.

// 4. Declarative vs Imperative
//i. Imperative (vanilla JS): You give step-by-step instructions for how to change things
function addToCartImperative(product) {
  const badge = document.querySelector(".cart-count");
  badge.textContent = Number(badge.textContent) + 1; // manual DOM update
  const item = document.createElement("li");
  item.textContent = product.name;
  document.querySelector(".cart-list").appendChild(item); // manual DOM update
}

// Declarative (React): You describe WHAT the UI should look like for a given stat, React figures out how to make the DOM to match it.
function CartBadge({ count }) {
  return <span className="cart-count">{count}</span>;
  // You never touch the DOM directly. Change `count`, React re-renders.
}

// 4. Why React? — It's Composable. Composable = big UI built by combining small, focused components. Each piece can be built, tested, and reused on its own. Example navbar is really: Logo + SearchBar + NavIcons glued together.
function Navbar() {
  return (
    <nav className="navbar">
      <Logo />
      <SearchBar />
      <NavIcons />
    </nav>
  );
}

// 5. Custom Components: A component is just a JavaScript function that returns JSX. React treats capitalized tags as YOUR components, lowercase tags (<div>, <h3>) as regular HTML elements.The name must start with a capital letter.
// Example:
function NavIcons() {
  return (
    <div className="nav-icons">
      <span className="icon">🛒</span>
      <span className="icon">❤️</span>
    </div>
  );
}

// 6. Fragments: A component can only return ONE root element. Fragments (<>...</>) let you return multiple elements without adding a pointless wrapper <div> to the DOM.
// Without Fragment ❌ — An unnecessary div could break your existing GoldenGen grid/flex CSS that expects direct children.
function ProductMetaBad() {
  return (
    <div>
      <span className="stock-badge">In Stock</span>
      <span className="warranty-badge">1 Yr Warranty</span>
    </div>
  );
}

// With Fragment ✅ — You group multiple elements without adding any real node to the DOM:
function ProductMeta() {
  return (
    <>
      <span className="stock-badge">In Stock</span>
      <span className="warranty-badge">1 Yr Warranty</span>
    </>
  );
}

// 7. Parent / Child Components: A parent component renders other components inside itself. Those nested ones are its children.
//Examples:
function ProductCard() {
  return (
    <div className="product-card">
      <ProductImage />
      <ProductInfo />
      <ProductMeta />
    </div>
  );
}

function ProductImage() {
  return (
    <img
      className="product-img"
      src="macbook-pro-m3.jpg"
      alt="MacBook Pro M3"
    />
  );
}

function ProductInfo() {
  return (
    <div className="product-info">
      <h3>MacBook Pro M3</h3>
      <p className="price">Ksh 185,000</p>
    </div>
  );
}
// ProductCard = parent. ProductImage, ProductInfo, ProductMeta = children.

// 8. Styling with Classes: In JSX you use "className", NOT "class". "class" is already a reserved word in JavaScript
//Example:
function DiscountBadge() {
  return <span className="badge badge-discount">-15%</span>;
}
