import { createSlice } from '@reduxjs/toolkit';

export type PortfolioProduct = {
  baseAmount: string;
  quoteAmount: string;
}

export type PortfolioProductAmountPayload = {
  payload: {
    productId: string;
  } & PortfolioProduct
}

const initialState = {};

const portfolioProductAmountSlice = createSlice({
  name: 'portfolioProductAmount',
  initialState: initialState,
  reducers: {
    updateProductAmountBuy: (state: Record<string, PortfolioProduct>, action: PortfolioProductAmountPayload) => {
        const { productId, baseAmount, quoteAmount } = action.payload;
        if (state.hasOwnProperty(productId)) {
            const baseTotalAmount = Number(baseAmount) + Number(state[productId].baseAmount);
            const quoteTotalAmount = Number(quoteAmount) + Number(state[productId].quoteAmount);
            state[productId] = { baseAmount: `${baseTotalAmount}`, quoteAmount: `${quoteTotalAmount}` };
        } else {
          state[productId] = { baseAmount, quoteAmount };
        }
    },
    updateProductAmountSell: (state: Record<string, PortfolioProduct>, action: PortfolioProductAmountPayload) => {
      const { productId, baseAmount, quoteAmount } = action.payload;
      if (state.hasOwnProperty(productId)) {
          const baseTotalAmount = Number(state[productId].baseAmount) - Number(baseAmount);
          const quoteTotalAmount = Number(state[productId].quoteAmount) - Number(quoteAmount);
          if(baseTotalAmount >= 0 && quoteTotalAmount >=0) {
            state[productId] = { baseAmount: `${baseTotalAmount}`, quoteAmount: `${quoteTotalAmount}` };
          }
      } else {
        state[productId] = { baseAmount, quoteAmount };
      }
  },
    removeProductAmount: (state: Record<string, string>, action: PortfolioProductAmountPayload) => {
      const { productId } = action.payload;
      if (state.hasOwnProperty(productId)) {
        delete state[productId];
      }
    },
  },
});

export const { updateProductAmountBuy, updateProductAmountSell, removeProductAmount } = portfolioProductAmountSlice.actions;
export default portfolioProductAmountSlice.reducer;