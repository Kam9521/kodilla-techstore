import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProducts } from "../features/products/productsSlice";
import Reveal from "../components/Reveal";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(price);

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { items, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  return (
    <>
      <section className="hero">
        <div className="hero-stars" aria-hidden="true" />
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="eyebrow">✦ NEXT LEVEL GAMING</span>

          <h1>
            Odkryj nowy
            <span className="gradient-text"> wymiar gamingu.</span>
          </h1>

          <p>
            Sprzęt, który dotrzymuje Ci kroku. Precyzja, wydajność i technologia
            z przyszłości — wszystko w jednym miejscu.
          </p>

          <a className="neon-button" href="#produkty">
            Odkryj produkty
            <span aria-hidden="true"> ↗</span>
          </a>
        </motion.div>

        <div className="hero-bottom-label">SCROLL TO EXPLORE ↓</div>
      </section>

      <main id="produkty" className="store-main">
        {location.state?.orderSuccess && (
          <div className="success-message" role="status">
            Dziękujemy! Zamówienie zostało złożone.
          </div>
        )}

        <Reveal>
          <div className="section-heading">
            <span className="eyebrow">✦ NASZA KOLEKCJA</span>
            <h2>
              Wybierz swoją
              <span className="gradient-text"> przewagę.</span>
            </h2>
            <p>
              Odkryj akcesoria stworzone dla graczy, którzy oczekują czegoś
              więcej.
            </p>
          </div>
        </Reveal>

        {loading && <p>Ładowanie produktów...</p>}

        {error && (
          <p role="alert" className="error-message">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="products-grid">
            {items.map((product, index) => (
              <Reveal key={product.id} delay={Math.min(index * 0.1, 0.3)}>
                <motion.article
                  className="product-card"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="product-image-wrap">
                    <span className="product-tag">TECHSTORE</span>

                    <img src={product.image} alt={product.name} />
                  </div>

                  <div className="product-card-content">
                    <h3>{product.name}</h3>

                    <p className="product-price">
                      {formatPrice(product.price)}
                    </p>

                    <Link
                      className="product-link"
                      to={`/products/${product.id}`}
                    >
                      Zobacz produkt
                      <span aria-hidden="true"> ↗</span>
                    </Link>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        )}
      </main>

      <section className="features-section">
        <Reveal>
          <div className="section-heading">
            <span className="eyebrow">✦ DLACZEGO TECHSTORE?</span>
            <h2>
              Technologia bez
              <span className="gradient-text"> kompromisów.</span>
            </h2>
          </div>
        </Reveal>

        <div className="features-grid">
          <Reveal delay={0}>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Wydajność</h3>
              <p>Akcesoria dobrane z myślą o szybkości i precyzji.</p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="feature-card">
              <div className="feature-icon">✦</div>
              <h3>Nowoczesność</h3>
              <p>
                Rozwiązania, które podkreślają charakter Twojego stanowiska.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="feature-card">
              <div className="feature-icon">◈</div>
              <h3>Twój setup</h3>
              <p>Zbuduj przestrzeń do grania i pracy na własnych zasadach.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
