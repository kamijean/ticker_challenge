import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type WatchlistState = {
  [productId: string]: string;
}

type WatchlistPayload = {
    productId: string;
    baseAmount: string;
}

const initialState: WatchlistState = {};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    updateWatchlist: (state, action: PayloadAction<WatchlistPayload>) => {
      const { productId, baseAmount } = action.payload;
      if (productId in state) {
        delete state[productId];
      } else {
        state[productId] = baseAmount;
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