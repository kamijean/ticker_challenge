import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PortfolioProduct = {
  baseAmount: string;
  quoteAmount: string;
};

export type PortfolioProductPayload = {
  productId: string;
  baseAmount: string;
};

type PortfolioProductAmountState = Record<string, PortfolioProduct>;

const initialState: PortfolioProductAmountState = {};

const portfolioProductSlice = createSlice({
  name: 'portfolioProductAmount',
  initialState,
  reducers: {
    updateProductAmountBuy: (
      state,
      action: PayloadAction<PortfolioProductPayload>
    ) => {
      const { productId, baseAmount } = action.payload;
      const existingProduct = state[productId];

      if (existingProduct) {
        const baseTotalAmount = Number(baseAmount) + Number(existingProduct.baseAmount);
        const quoteTotalAmount = (Number(existingProduct.quoteAmount) || 0) + 1;

        state[productId] = { baseAmount: `${baseTotalAmount}`, quoteAmount: `${quoteTotalAmount}` };
      } else {
        state[productId] = { baseAmount, quoteAmount: '1' };
      }
    },
    updateProductAmountSell: (
      state,
      action: PayloadAction<PortfolioProductPayload>
    ) => {
      const { productId, baseAmount } = action.payload;
      const existingProduct = state[productId];

      if (existingProduct) {
        const baseTotalAmount = Math.max(Number(existingProduct.baseAmount) - Number(baseAmount), 0);
        const quoteTotalAmount = Math.max(Number(existingProduct.quoteAmount) - 1, 0);

        state[productId] = { baseAmount: `${baseTotalAmount}`, quoteAmount: `${quoteTotalAmount}` };
      }
    },
    removeProductAmount: (state, action: PayloadAction<PortfolioProductPayload>) => {
      const { productId } = action.payload;
      delete state[productId];
    },
  },
});

export const { updateProductAmountBuy, updateProductAmountSell, removeProductAmount } = portfolioProductSlice.actions;
export default portfolioProductSlice.reducer;
