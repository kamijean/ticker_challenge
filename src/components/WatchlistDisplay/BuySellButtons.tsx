import React, { useCallback } from "react";
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
  quoteAmount: string;
  productId: string;
};

const BuySellButtons = ({ quoteAmount, productId }: BuySellButtonsProps) => {
  const dispatch = useDispatch();

  const handleUpdateProductAmountBuy = useCallback(() => {
    dispatch(updateProductAmountBuy({ productId, quoteAmount }));
  }, [quoteAmount, dispatch, productId]);

  const handleUpdateProductAmountSell = useCallback(() => {
    dispatch(updateProductAmountSell({ productId, quoteAmount }));
  }, [quoteAmount, dispatch, productId]);

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
