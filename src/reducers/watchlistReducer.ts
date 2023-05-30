import { createSlice } from '@reduxjs/toolkit';
import { PortfolioProduct, PortfolioProductAmountPayload } from './portfolioReducer';


const initialState = {};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: initialState,
  reducers: {
    updateWatchlist: (state: Record<string, PortfolioProduct>, action: PortfolioProductAmountPayload) => {
        const { productId, baseAmount, quoteAmount } = action.payload;
        if (state.hasOwnProperty(productId)) {
            delete state[productId];
        } else {
            state[productId] = { baseAmount, quoteAmount };
        }
    },
    removeProduct: (state: Record<string, string>, action: PortfolioProductAmountPayload) => {
      const { productId } = action.payload;
      if (state.hasOwnProperty(productId)) {
        delete state[productId];
      }
    },
  },
});

export const { updateWatchlist, removeProduct } = watchlistSlice.actions;
export default watchlistSlice.reducer;