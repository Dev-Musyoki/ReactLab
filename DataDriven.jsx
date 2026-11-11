// Data Driven React
// 1. The Problem! Handcorded Components Don't Scale: In the previous topic, the ProductCard had one product baked into the JSX. This only works for one product.
function ProductCard() {
  return (
    <div className="product-card">
      <img src="macbook-air-m3.jpg" alt="MacBook Air M3" />
      <h3>Apple MacBook Air M3 13"</h3>
      <p>Ksh 169,000</p>
    </div>
  );
}

// So with multiple products, each product will have a product card leading to: The Problem!!
   //1. Duplication: change the card layout (say, add a warranty line) and you edit all components.
   //2. Data is welded to markup: to update a price, you dig through JSX instead of changing data.
   //3. It can’t respond to your data source: you already have a PRODUCTS array, and nothing here can use it.

// function MacBookCard() { /* hardcoded MacBook */ }
// function DellXpsCard() { /* hardcoded Dell */ }
// function LogitechMouseCard() { /* hardcoded mouse */ }
// ...Many more
  

// A plain function receives different values through parameters, and a React component does the same, except React bundles everything into one object and passes it as the single parameter. That object is called props (short for properties).

// Props: Mechanism for passing data from parent to child components. 
// Comparison: JavaScript function parameters vs React props
// Plain JS function: different input each call, different output
function describeProduct(name, price) {
  return name + " costs Ksh " + price;
}
describeProduct("MacBook Air M3", 169000);
describeProduct("Dell XPS 15", 215000);

// React component: same idea, but the "arguments" are written like HTML attributes
function ProductCardInfo(props) {
    return (
        <div className="product-card">
            <h3>{props.name}</h3>
            <p>KSh {props.price}</p>
        </div>
    );
}

export default function App() {
    return (
        <>
            <ProductCardInfo name="MacBook Air M3" price={169000} />
            <ProductCardInfo name="Dell XPS 15" price={215000} />
        </>
    );
}

// Three rules to hold onto:
// Data flows one way, down. A parent passes props to a child. A child can’t reach up and change them. Treat props as read-only.
// Curly braces mean “this is JavaScript”. name="MacBook" is a plain string. price={169000} is a JS expression, so it arrives as a real number.
// Same component, different data, different output. This fixes the duplication problem: one ProductCard written once, used many times.


// Destructuring Props: Since props is just an object, we can use JavaScript destructuring to pull out the values we want. This makes code cleaner and easier to understand.

// Before: repeating props. everywhere
function ProductCard1(props) {
  return <h3>{props.name}</h3>;
}

// After: destructure in the parameter
function ProductCard2({ name, price, stock }) {
  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p>Ksh {price}</p>
      <span>{stock === 0 ? "Out of Stock" : `${stock} in stock`}</span>
    </div>
  );
}
// Two details to watch:
// The names in { name, price, stock } must match the attribute names used when you write <ProductCard name=... />. If you destructure title but pass name, you’ll get undefined.
// Because it’s ordinary destructuring, you can also set defaults: { name, stock = 0 }.


// Default values on destructured props:
//  You can set default values for destrucutured props.This is useful for optional props. If the parent does not pass a value, the default will be used.

<ProductCard name="Wireless Mouse" price={1500} /> // The parent renders a product card for a wireless mouse, but does not provide warranty information. 

function ProductCard4({
  name,
  price,
  warranty = "Warranty information unavailable"
}) {
  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p>KSh {price}</p>
      <p>{warranty}</p>
    </div>
  );
}
// Use a default when you want the card to always show something. 

// Solution 2: Conditional Rendering: You can also use conditional rendering to display diffrent content based on the props passed to the component. 
function ProductCard5({ name, price, warranty }) {
  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p>KSh {price}</p>

      {warranty && <p>Warranty: {warranty}</p>} // If warranty is truthy, render the warranty paragraph. If it's falsy (undefined, null, false, 0, etc.) render nothing.
    </div>
  );
}
// Use conditional display when the element shouldn’t exist at all. 


// Non-String Props: Props can be any JavaScript value, not just strings. You can pass numbers, booleans,arrays, objects, and even fuctions as props. This allows you to create more complex and dynamic components.
// The quotes vs curly braces rule decides how it’s read:

<ProductCard
  name="MacBook Air M3"                  // string: quotes
  price={169000}                         // number: braces
  inStock={true}                         // boolean: braces
  specs={["16GB RAM", "512GB SSD"]}      // array: braces
  delivery={{ days: 2, free: true }}     // object: braces, so double {{ }}
  onAddToCart={() => console.log("added")} // function: braces
/>


// Topic 5: Importing Static Assets:
//  React does not know how to handle static assets like images, so you need to import them. This is because React uses a build tool (like Webpack) that needs to know about the assets.
// In a Vite + React project, you have two ways to reference an image, and they behave differently.
//1. Import it (for images inside src/):
import macbook from "./assets/macbook-air-m3.jpg";

function ProductCard6() {
  return <img src={macbook} alt="MacBook Air M3" />;
}

//2. Put it in public/ and use an absolute path:
<img src="/images/products/macbook-air-m3.jpg" alt="MacBook Air M3" />


// Topic 6: array.map() and Rendering lists:
// Example: You have an array of products, and you want to render a ProductCard for each product.
// How JS handles it vs how React handles it: In JS, you can use map() to create a new array of values. In React you can use map() to create a new array of elements and React will render them.

// Vanilla (imperative): build and insert each card yourself
PRODUCTS.forEach((product) => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `<h3>${product.name}</h3>`;
  document.getElementById("products-grid").appendChild(card);
});

// React (declarative): describe the list, let React render it
const PRODUCTS = [
  { id: 1, name: "MacBook Air M3", price: 169000, stock: 5, image: "/images/products/macbook-air-m3.jpg" },
  { id: 2, name: "Dell XPS 15", price: 215000, stock: 0, image: "/images/products/dell-xps-15.jpg" },
  { id: 3, name: "Logitech MX Master 3", price: 12500, stock: 18, image: "/images/products/mx-master-3.jpg" },
];

function ProductGrid() {
  return (
    <div className="products-grid">
      {PRODUCTS.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          stock={product.stock}
          image={product.image}
        />
      ))}
    </div>
  );
}


// Topic 7: The Key Prop: React needs key for one reason: when your list changes, it has to figure out which item is which.
// Example:
// Think about GoldenGen’s products page. A user sorts by price, types in the search box, or ticks the “in stock” filter. The list of cards changes: some disappear, some move, some stay. React compares the old list to the new one and wants to update the DOM as cheaply as possible, so it must answer “is this card the same product as before, just moved, or a different product?” The key is the answer. It’s a stable identity tag for each item.

{PRODUCTS.map((product) => (
  <ProductCard key={product.id} name={product.name} price={product.price} />
))}

// Two common mistakes with keys:
// ❌ Index as key: breaks when the list reorders or filters
{PRODUCTS.map((product, index) => <ProductCard key={index} ... />)}

// ❌ Random key: a new key every render, so React throws away and rebuilds every card
{PRODUCTS.map((product) => <ProductCard key={Math.random()} ... />)}

// key isn’t a normal prop. You can’t read props.key inside ProductCard. If the card needs the id, pass it separately (id={product.id}).
// The rule to remember: Index keys can be acceptable for truly static lists, or lists that only append and never reorder or remove items. For searchable, filterable, or sortable product lists, use stable IDs. 


// Topic 8: Passing Objects as Props, and the Spread Operator:
// Earlier we passed four fields one by one.
<ProductCard
  key={product.id}
  name={product.name}
  price={product.price}
  stock={product.stock}
  image={product.image}
/>

// Instead, we can pass the whole product object as a single prop. This is cleaner and easier to understand.

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Ksh {product.price.toLocaleString()}</p>
    </div>
  );
}

// Even cleaner: Use the spread operator to pass all fields of the product object as individual props.
<ProductCard key={product.id} {...product} />

function ProductCard({ name, price, stock, image }) {
  // same destructured props as before
}
