import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../products/productsSlice";

export interface CartItem {
  product: Product;
  quantity: number;
  note: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity: number }>,
    ) => {
      const { product, quantity } = action.payload;
      const existing = state.items.find(
        (item) => item.product.id === product.id,
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({
          product,
          quantity,
          note: "",
        });
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload.productId,
      );

      if (item && action.payload.quantity >= 1) {
        item.quantity = action.payload.quantity;
      }
    },

    updateNote: (
      state,
      action: PayloadAction<{ productId: string; note: string }>,
    ) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload.productId,
      );

      if (item) {
        item.note = action.payload.note;
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload,
      );
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  updateNote,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
