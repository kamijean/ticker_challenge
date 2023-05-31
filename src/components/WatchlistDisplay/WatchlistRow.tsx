import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateWatchlist } from "../../reducers/watchlistReducer";
import BuySellButtons from "./BuySellButtons";
import styled from "styled-components";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

export type TickerStreamPayload = {
  e: string; // Event type
  E: Date; // Event time
  s: string; // Symbol
  p: string; // Price change
  P: string; // Price change percent
  o: string; // Open price
  h: string; // High price
  l: string; // Low price
  c: string; // Last price
  w: string; // Weighted average price
  v: string; // Total traded base asset volume
  q: string; // Total traded quote asset volume
  O: number; // Statistics open time
  C: Date; // Statistics close time
  F: number; // First trade ID
  L: number; // Last trade Id
  n: number; // Total number of trades
};

type WatchlistRowProps = {
  productId: string;
  data: TickerStreamPayload[];
};

const WatchlistWrapper = styled.div`
  padding: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: space-between;
`;

const WatchlistDetailsWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 220px;
  justify-content: space-between;
  margin-right: 20px;
  &:hover {
    filter: brightness(0.5);
  }
`;

const WatchlistRow = ({ productId, data }: WatchlistRowProps) => {
  const dispatch = useDispatch();

  const watchlistList = useSelector(
    (state: { watchlist: Record<string, string> }) => state.watchlist
  );

  const tickerRow = React.useMemo(() => {
    return data.find((item) => item.s === productId);
  }, [data, productId]);

  const quoteAmount = tickerRow?.c ?? watchlistList[productId];

  const handleUpdateWatchlist = React.useCallback(() => {
    dispatch(updateWatchlist({ productId, quoteAmount }));
  }, [dispatch, productId, quoteAmount]);

  return (
    <WatchlistWrapper>
      <FavoriteOutlinedIcon />
      <WatchlistDetailsWrapper onClick={handleUpdateWatchlist}>
        <span>{productId}</span>
        <span>{quoteAmount}</span>
      </WatchlistDetailsWrapper>
      <BuySellButtons quoteAmount={quoteAmount} productId={productId} />
    </WatchlistWrapper>
  );
};

export default WatchlistRow;
