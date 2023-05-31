import React from "react";
import { useSelector } from "react-redux";
import { PortfolioProduct } from "../../reducers/portfolioReducer";
import styled from "styled-components";

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid gray;
`;

const AssetWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const TableHeaderHead = styled.thead`
  border-bottom: 1px solid gray;
`;

const TableHeader = styled.th`
  font-weight: bold;
  padding-bottom: 20px;
  padding-top: 20px;
  padding-right: 30px;
  text-align: left;
`;

const TableHeaderFirstChild = styled.th`
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 20px;
  padding-top: 20px;
`;

const TableRow = styled.tr`
  border-bottom: 1pt solid gray;
`;

const TableColumn = styled.td`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 30px;
`;

const TableColumnFirstChild = styled.td`
  padding-left: 30px;
  padding-right: 0;
`;

export type PorfolioValues = {
  symbol: string;
  baseAmount: string;
  quoteAmount: string;
};

const ProductDisplay = () => {
  const productsList: Record<string, PortfolioProduct> = useSelector(
    (state: Record<string, Record<string, PortfolioProduct>>) => state.portfolio
  );

  const productListKeys = React.useMemo(
    () => Object.keys(productsList),
    [productsList]
  );

  return (
    <div>
      <h3>Current Assets</h3>
      <AssetWrapper>
        {productListKeys.length > 0 ? (
          <Table>
            <TableHeaderHead>
              <TableHeaderFirstChild>Product Id</TableHeaderFirstChild>
              <TableHeader>Base Amount</TableHeader>
              <TableHeader>Quote Amount</TableHeader>
            </TableHeaderHead>
            <tbody>
              {productListKeys.map((productId) => (
                <TableRow key={productId}>
                  <TableColumnFirstChild>{productId}</TableColumnFirstChild>
                  <TableColumn>
                    {productsList[productId].baseAmount}
                  </TableColumn>
                  <TableColumn>
                    {productsList[productId].quoteAmount}
                  </TableColumn>
                </TableRow>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No current assets</p>
        )}
      </AssetWrapper>
    </div>
  );
};

export default ProductDisplay;
