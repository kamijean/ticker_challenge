import React from "react";
import { useSelector } from "react-redux";
import { PortfolioProduct } from "../../reducers/portfolioReducer";
import styled from "styled-components";
import Table, { TableDefinitionType } from "../common/Table";
import Card from "../common/Card";

const AssetWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export type PorfolioValues = {
  productId: string;
  baseAmount: string;
  quoteAmount: string;
};

const columns: TableDefinitionType<PorfolioValues, keyof PorfolioValues>[] = [
  {
    key: "productId",
    header: "Product Id",
  },
  {
    key: "baseAmount",
    header: "Base Amount",
  },
  {
    key: "quoteAmount",
    header: "Quote Amount",
  },
];

const ProductDisplay = () => {
  const productsList: Record<string, PortfolioProduct> = useSelector(
    (state: Record<string, Record<string, PortfolioProduct>>) => state.portfolio
  );

  const productListArray: PorfolioValues[] = React.useMemo(() => {
    return Object.keys(productsList).map((productId) => ({
      productId,
      ...productsList[productId],
    }));
  }, [productsList]);

  return (
    <Card>
      <h3>Current Assets</h3>
      <AssetWrapper>
        {productListArray.length > 0 ? (
          <Table data={productListArray} columns={columns} />
        ) : (
          <p>No current assets</p>
        )}
      </AssetWrapper>
    </Card>
  );
};

export default ProductDisplay;
