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
  baseAmount: string;
  productId: string;
};

const BuySellButtons = ({ baseAmount, productId }: BuySellButtonsProps) => {
  const dispatch = useDispatch();

  const handleUpdateProductAmountBuy = useCallback(() => {
    dispatch(updateProductAmountBuy({ productId, baseAmount }));
  }, [baseAmount, dispatch, productId]);

  const handleUpdateProductAmountSell = useCallback(() => {
    dispatch(updateProductAmountSell({ productId, baseAmount }));
  }, [baseAmount, dispatch, productId]);

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
