import React from "react";
import { useDispatch } from "react-redux";
import {
  updateProductAmountBuy,
  updateProductAmountSell,
} from "../../reducers/portfolioReducer";
import Button from "../common/Button";
import { ButtonColorLookup, buttonColorMap } from "../../helpers/colorHelper";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

type BuySellButtonsProps = {
  baseAmount: string;
  quoteAmount: string;
  productId: string;
};

const BuySellButtons = ({
  baseAmount,
  quoteAmount,
  productId,
}: BuySellButtonsProps) => {
  const dispatch = useDispatch();

  const handleUpdateProductAmountBuy = React.useCallback(() => {
    dispatch(updateProductAmountBuy({ productId, baseAmount, quoteAmount }));
  }, [baseAmount, dispatch, productId, quoteAmount]);

  const handleUpdateProductAmountSell = React.useCallback(() => {
    dispatch(updateProductAmountSell({ productId, baseAmount, quoteAmount }));
  }, [baseAmount, dispatch, productId, quoteAmount]);

  return (
    <ButtonWrapper>
      <Button label="Buy" onClick={handleUpdateProductAmountBuy} />
      <Button
        label="Sell"
        onClick={handleUpdateProductAmountSell}
        buttonColor={buttonColorMap.danger as ButtonColorLookup}
      />
    </ButtonWrapper>
  );
};

export default BuySellButtons;
