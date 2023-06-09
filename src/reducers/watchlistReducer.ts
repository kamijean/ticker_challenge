import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type WatchlistState = {
  [productId: string]: string;
}

export type WatchlistPayload = {
    productId: string;
    quoteAmount: string;
}

const initialState: WatchlistState = {};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    updateWatchlist: (state, action: PayloadAction<WatchlistPayload>) => {
      const { productId, quoteAmount } = action.payload;
      if (productId in state) {
        delete state[productId];
      } else {
        state[productId] = quoteAmount;
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      if (productId in state) {
        delete state[productId];
      }
    },
  },
});

export const { updateWatchlist, removeProduct } = watchlistSlice.actions;
export default watchlistSlice.reducer;