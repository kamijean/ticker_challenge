import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateWatchlist } from "../../reducers/watchlistReducer";
import styled from "styled-components";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

export type BinanceTicker = {
  symbol: string;
  priceChange: string; // Absolute price change
  priceChangePercent: string; // Relative price change in percent
  weightedAvgPrice: string; // QuoteVolume / Volume
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  lastPrice: string;
  volume: string;
  quoteVolume: string; // Sum of (price * volume) for all trades
  openTime: number; // Open time for ticker window
  closeTime: number; // Current Time of the Request
  firstId: number; // Trade IDs
  lastId: number;
  count: number;
};

type TickerRowProps = {
  ticker: BinanceTicker;
};

const TickerRowWrapper = styled.div`
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
  &:hover {
    filter: brightness(0.5);
  }
`;

const TickerRow = ({ ticker }: TickerRowProps) => {
  const watchlistList = useSelector(
    (state: { watchlist: Record<string, string> }) => state.watchlist
  );
  const dispatch = useDispatch();

  const handleUpdateWatchlist = useCallback(() => {
    const { symbol, lastPrice } = ticker;
    dispatch(
      updateWatchlist({
        productId: symbol,
        quoteAmount: lastPrice,
      })
    );
  }, [dispatch, ticker]);

  const isSelected = useMemo(
    () => watchlistList.hasOwnProperty(ticker.symbol),
    [watchlistList, ticker.symbol]
  );

  return (
    <TickerRowWrapper onClick={handleUpdateWatchlist}>
      {isSelected ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
      <span>{ticker.symbol}</span>
    </TickerRowWrapper>
  );
};

export default TickerRow;
