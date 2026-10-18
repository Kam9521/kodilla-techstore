import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { clearCart } from "../features/cart/cartSlice";
import "./CheckoutPage.css";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(price);

export default function CheckoutPage() {
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
  });

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (items.length === 0 || sending) return;

    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            note: item.note,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Nie udało się złożyć zamówienia.");
      }

      dispatch(clearCart());
      navigate("/", { state: { orderSuccess: true } });
    } catch {
      setError("Wystąpił błąd podczas składania zamówienia. Spróbuj ponownie.");
    } finally {
      setSending(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="checkout-page">
        <section className="checkout-empty-card">
          <span className="checkout-eyebrow">TechStore / Zamówienie</span>
          <h1 className="checkout-title">Koszyk jest pusty</h1>
          <p>
            Dodaj produkty do koszyka, aby przejść do finalizacji zamówienia.
          </p>
          <Link className="checkout-empty-link" to="/">
            ← Wróć do produktów
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <Link className="checkout-back-link" to="/cart">
        ← Wróć do koszyka
      </Link>

      <header>
        <span className="checkout-eyebrow">✦ TechStore / Finalizacja</span>
        <h1 className="checkout-title">Finalizacja zamówienia</h1>
        <p className="checkout-description">
          Uzupełnij dane kontaktowe i adres dostawy, aby sfinalizować zakup.
        </p>
      </header>

      <div className="checkout-layout">
        <section className="checkout-form-card">
          <h2 className="checkout-section-title">Dane zamawiającego</h2>
          <p className="checkout-section-description">
            Pola formularza są wymagane do złożenia zamówienia.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="checkout-fields">
              <label className="checkout-field">
                Imię i nazwisko
                <input
                  className="checkout-input"
                  required
                  autoComplete="name"
                  placeholder="Jan Kowalski"
                  value={form.customerName}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      customerName: event.target.value,
                    })
                  }
                />
              </label>

              <label className="checkout-field">
                Adres e-mail
                <input
                  className="checkout-input"
                  required
                  type="email"
                  autoComplete="email"
                  placeholder="jan@example.com"
                  value={form.email}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      email: event.target.value,
                    })
                  }
                />
              </label>

              <label className="checkout-field">
                Numer telefonu
                <input
                  className="checkout-input"
                  required
                  type="tel"
                  autoComplete="tel"
                  placeholder="+48 500 600 700"
                  value={form.phone}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      phone: event.target.value,
                    })
                  }
                />
              </label>

              <label className="checkout-field">
                Adres dostawy
                <textarea
                  className="checkout-textarea"
                  required
                  autoComplete="street-address"
                  placeholder="Ulica, numer domu, kod pocztowy, miejscowość"
                  value={form.address}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      address: event.target.value,
                    })
                  }
                />
              </label>
            </div>

            {error && (
              <p className="checkout-error" role="alert">
                {error}
              </p>
            )}

            <button
              className="checkout-submit-button"
              type="submit"
              disabled={sending}
            >
              {sending
                ? "Wysyłanie zamówienia..."
                : `Złóż zamówienie • ${formatPrice(total)} →`}
            </button>
          </form>
        </section>

        <aside className="checkout-summary-card">
          <h2 className="checkout-summary-title">Twoje zamówienie</h2>

          {items.map((item) => (
            <div className="checkout-summary-item" key={item.product.id}>
              <img
                className="checkout-summary-image"
                src={item.product.image}
                alt={item.product.name}
              />

              <div className="checkout-summary-info">
                <p className="checkout-summary-name">{item.product.name}</p>
                <p className="checkout-summary-quantity">
                  Ilość: {item.quantity}
                </p>
                <p className="checkout-summary-price">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
                {item.note && (
                  <p className="checkout-summary-note">Uwagi: {item.note}</p>
                )}
              </div>
            </div>
          ))}

          <div className="checkout-summary-divider" />

          <div className="checkout-summary-total">
            <span>Łącznie</span>
            <strong>{formatPrice(total)}</strong>
          </div>
        </aside>
      </div>
    </main>
  );
}
