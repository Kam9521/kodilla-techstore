import { Link, Route, Routes } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import CursorGlow from "./components/CursorGlow";

export default function App() {
  const count = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  return (
    <>
      <CursorGlow />

      <header className="site-header">
        <div className="header-inner">
          <Link className="logo" to="/">
            TECH<span>STORE</span>
            <span className="logo-dot">.</span>
          </Link>

          <nav aria-label="Nawigacja główna">
            <Link to="/">Produkty</Link>
            <Link className="cart-nav-link" to="/cart">
              Koszyk <span className="cart-count">{count}</span>
            </Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route
          path="*"
          element={
            <main>
              <h1>Nie znaleziono strony</h1>
              <Link to="/">Wróć do sklepu</Link>
            </main>
          }
        />
      </Routes>

      <footer className="site-footer">
        <div>
          <Link className="logo" to="/">
            TECH<span>STORE</span>.
          </Link>
          <p>Twój sprzęt. Twoja przewaga.</p>
        </div>

        <p>© {new Date().getFullYear()} TechStore</p>
      </footer>
    </>
  );
}
