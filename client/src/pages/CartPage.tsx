import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  removeFromCart,
  updateNote,
  updateQuantity,
} from "../features/cart/cartSlice";
import "./CartPage.css";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(price);

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <Link className="cart-back-link" to="/">
          ← Wróć do produktów
        </Link>

        <section className="cart-empty-card">
          <div className="cart-empty-icon" aria-hidden="true">
            🛒
          </div>
          <span className="cart-eyebrow">TechStore / Koszyk</span>
          <h1 className="cart-title">Twój koszyk jest pusty</h1>
          <p>Czas wybrać sprzęt, który zapewni Ci przewagę w grze.</p>
          <Link className="cart-empty-button" to="/">
            Odkryj produkty →
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <Link className="cart-back-link" to="/">
        ← Kontynuuj zakupy
      </Link>

      <header className="cart-heading">
        <span className="cart-eyebrow">✦ TechStore / Twój zestaw</span>
        <h1 className="cart-title">Twój koszyk</h1>
        <p className="cart-subtitle">
          Sprawdź wybrany sprzęt i przygotuj się na kolejny poziom.
        </p>
      </header>

      <div className="cart-layout">
        <section className="cart-items-list" aria-label="Produkty w koszyku">
          {items.map((item) => (
            <article className="cart-product-card" key={item.product.id}>
              <Link to={`/products/${item.product.id}`}>
                <img
                  className="cart-product-image"
                  src={item.product.image}
                  alt={item.product.name}
                />
              </Link>

              <div className="cart-product-info">
                <h2 className="cart-product-name">
                  <Link to={`/products/${item.product.id}`}>
                    {item.product.name}
                  </Link>
                </h2>

                <p className="cart-unit-price">
                  {formatPrice(item.product.price)} / szt.
                </p>

                <div className="cart-product-controls">
                  <label className="cart-field">
                    Ilość
                    <input
                      className="cart-quantity-input"
                      type="number"
                      min="1"
                      step="1"
                      value={item.quantity}
                      onChange={(event) => {
                        const value = Number(event.target.value);

                        dispatch(
                          updateQuantity({
                            productId: item.product.id,
                            quantity: Number.isFinite(value)
                              ? Math.max(1, Math.floor(value))
                              : 1,
                          }),
                        );
                      }}
                    />
                  </label>
                </div>

                <label className="cart-field">
                  Uwagi do produktu
                  <textarea
                    className="cart-note-input"
                    value={item.note}
                    placeholder="Np. dodatkowe informacje do zamówienia..."
                    onChange={(event) =>
                      dispatch(
                        updateNote({
                          productId: item.product.id,
                          note: event.target.value,
                        }),
                      )
                    }
                  />
                </label>

                <div className="cart-product-bottom">
                  <strong className="cart-line-total">
                    {formatPrice(item.product.price * item.quantity)}
                  </strong>

                  <button
                    type="button"
                    className="cart-remove-button"
                    onClick={() => dispatch(removeFromCart(item.product.id))}
                  >
                    Usuń produkt
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <aside className="cart-summary-card">
          <h2 className="cart-summary-title">Podsumowanie</h2>

          <div className="cart-summary-row">
            <span>Produkty</span>
            <span>{totalQuantity} szt.</span>
          </div>

          <div className="cart-summary-row">
            <span>Wartość produktów</span>
            <span>{formatPrice(total)}</span>
          </div>

          <div className="cart-summary-divider" />

          <div className="cart-summary-total">
            <span>Łącznie</span>
            <strong>{formatPrice(total)}</strong>
          </div>

          <Link className="cart-checkout-button" to="/checkout">
            Przejdź do zamówienia →
          </Link>
        </aside>
      </div>
    </main>
  );
}
