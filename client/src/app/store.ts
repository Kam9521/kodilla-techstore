import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import cartReducer, { type CartItem } from "../features/cart/cartSlice";

const CART_STORAGE_KEY = "techstore_cart";

// Load cart from localStorage
const loadCart = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!savedCart) {
      return [];
    }

    const parsedCart: unknown = JSON.parse(savedCart);

    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return parsedCart as CartItem[];
  } catch (error) {
    console.error("Failed to load cart:", error);
    return [];
  }
};

// Configure Redux Store
export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
  preloadedState: {
    cart: {
      items: loadCart(),
    },
  },
});

// Automatically save cart changes to localStorage
store.subscribe(() => {
  try {
    const cart = store.getState().cart.items;

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart:", error);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
