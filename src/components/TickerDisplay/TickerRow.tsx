import React from "react";
import { updateWatchlist } from "../../reducers/watchlistReducer";
import { useDispatch, useSelector } from "react-redux";
import { BinanceTicker } from "./TickerList";
import styled from "styled-components";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { PortfolioProduct } from "../../reducers/portfolioReducer";

type TickerRowProps = {
  ticker: BinanceTicker;
};

const TickerWrapper = styled.div`
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const TickerRow = ({ ticker }: TickerRowProps) => {
  const watchlistList: Record<string, PortfolioProduct> = useSelector(
    (state: Record<string, Record<string, PortfolioProduct>>) => state.watchlist
  );
  const dispatch = useDispatch();

  const handleUpdateWatchlist = React.useCallback(() => {
    dispatch(
      updateWatchlist({
        productId: ticker.symbol,
        baseAmount: ticker.lastPrice,
        quoteAmount: ticker.quoteVolume,
      })
    );
  }, [dispatch, ticker.lastPrice, ticker.quoteVolume, ticker.symbol]);

  const isSelected = React.useMemo(
    () => watchlistList.hasOwnProperty(ticker.symbol),
    [ticker.symbol, watchlistList]
  );

  return (
    <TickerWrapper key={ticker.symbol} onClick={handleUpdateWatchlist}>
      {isSelected ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
      <span>{ticker.symbol}</span>
    </TickerWrapper>
  );
};

export default TickerRow;
