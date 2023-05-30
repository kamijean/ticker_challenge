import React from 'react';
import { useSelector } from 'react-redux';
import { PortfolioProduct } from '../reducers/portfolioReducer';

export type PorfolioValues = {
    symbol: string;
    baseAmount: string;
    quoteAmount: string;
}

const ProductDisplay = () => {
  const productsList: Record<string, PortfolioProduct> = useSelector((state: Record<string, Record<string, PortfolioProduct>>) => state.portfolio);
  
  return (
    <div>
      <h2>Portfolio Display</h2>
      {Object.keys(productsList).map((productId) => (
        <div key={productId}>
          <span>{productId}: base: {productsList[productId].baseAmount} quote: {productsList[productId].quoteAmount}</span>
        </div>
      ))}
    </div>
  );
};
  
export default ProductDisplay;