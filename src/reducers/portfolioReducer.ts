import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PortfolioProduct = {
  baseAmount: string;
  quoteAmount: string;
};

export type PortfolioProductPayload = {
  productId: string;
  quoteAmount: string;
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
      action: PayloadAction<PortfolioProductPayload>
    ) => {
      const { productId, quoteAmount } = action.payload;
      const existingProduct = state[productId];

      if (existingProduct) {
        const quoteTotalAmount = Math.max(Number(existingProduct.quoteAmount) - Number(quoteAmount), 0);
        const baseTotalAmount = Math.max(Number(existingProduct.baseAmount) - 1, 0);

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
