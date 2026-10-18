import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProducts } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";
import "./ProductDetailsPage.css";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(price);

function ProductDetailsContent() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.products);

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0 && !loading && !error) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length, loading, error]);

  const product = items.find((item) => item.id === id);

  if (loading && items.length === 0) {
    return (
      <main className="product-details-page">
        <p>Ładowanie produktu...</p>
      </main>
    );
  }

  if (error && !product) {
    return (
      <main className="product-details-page">
        <p role="alert">{error}</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="product-details-page">
        <h1>Nie znaleziono produktu</h1>
        <Link to="/">Wróć do sklepu</Link>
      </main>
    );
  }

  const gallery = Array.from(
    new Set([product.image, ...(product.images ?? [])]),
  );

  const activeImage =
    selectedImage && gallery.includes(selectedImage)
      ? selectedImage
      : product.image;

  const handleAdd = () => {
    dispatch(addToCart({ product, quantity }));
    setAdded(true);
  };

  return (
    <main className="product-details-page">
      <Link className="product-back-link" to="/">
        ← Wróć do produktów
      </Link>

      <div className="product-details-layout">
        <section className="product-image-panel" aria-label="Galeria produktu">
          <img
            className="product-featured-image"
            src={activeImage}
            alt={product.name}
          />

          {gallery.length > 1 && (
            <div className="product-thumbnails">
              {gallery.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  className={`product-thumbnail ${
                    activeImage === image ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(image)}
                  aria-label={`Pokaż zdjęcie ${index + 1}`}
                  aria-pressed={activeImage === image}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="product-info-panel">
          <span className="product-eyebrow">✦ TechStore Gaming Collection</span>

          <h1 className="product-details-title">{product.name}</h1>

          <p className="product-details-description">{product.description}</p>

          <p className="product-details-price">{formatPrice(product.price)}</p>

          <div className="product-purchase-controls">
            <label className="product-quantity-field">
              Ilość
              <input
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  setQuantity(
                    Number.isFinite(value) ? Math.max(1, Math.floor(value)) : 1,
                  );
                  setAdded(false);
                }}
              />
            </label>

            <button
              type="button"
              className="product-add-button"
              onClick={handleAdd}
            >
              Dodaj do koszyka ↗
            </button>
          </div>

          {added && (
            <div className="product-added-message" role="status">
              ✓ Produkt dodany do koszyka!{" "}
              <Link to="/cart">Przejdź do koszyka →</Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
export default function ProductDetailsPage() {
  const { id } = useParams();

  return <ProductDetailsContent key={id} />;
}
