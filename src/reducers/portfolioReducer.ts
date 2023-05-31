import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Portfolio = {
  baseAmount: string;
  quoteAmount: string;
};

export type PortfolioPayload = {
  productId: string;
  quoteAmount: string;
};

export type RemoveProductPayload = {
  productId: string;
};

type PortfolioAmountState = Record<string, Portfolio>;

const initialState: PortfolioAmountState = {};

const portfolioSlice = createSlice({
  name: 'portfolioAmount',
  initialState,
  reducers: {
    updateProductAmountBuy: (
      state,
      action: PayloadAction<PortfolioPayload>
    ) => {
      const { productId, quoteAmount } = action.payload;
      const existingProduct = state[productId];

      if (existingProduct) {
        const quoteTotalAmount = Number(quoteAmount) + Number(existingProduct.quoteAmount);
        const baseTotalAmount = (Number(existingProduct.baseAmount) || 0) + 1;

        state[productId] = { baseAmount: `${baseTotalAmount}`, quoteAmount: `${quoteTotalAmount}` };
      } else {
        state[productId] = { baseAmount: '1', quoteAmount };
      }
    },
    updateProductAmountSell: (
      state,
      action: PayloadAction<PortfolioPayload>
    ) => {
      const { productId, quoteAmount } = action.payload;
      const existingProduct = state[productId];

      if (existingProduct) {
        const quoteTotalAmount = Math.max(Number(existingProduct.quoteAmount) - Number(quoteAmount), 0);
        const baseTotalAmount = Math.max(Number(existingProduct.baseAmount) - 1, 0);

        state[productId] = { baseAmount: `${baseTotalAmount}`, quoteAmount: `${quoteTotalAmount}` };
      }
    },
    removeProductAmount: (state, action: PayloadAction<RemoveProductPayload>) => {
      const { productId } = action.payload;
      delete state[productId];
    },
  },
});

export const { updateProductAmountBuy, updateProductAmountSell, removeProductAmount } = portfolioSlice.actions;
export default portfolioSlice.reducer;
