import React from "react";
import { useSelector } from "react-redux";
import useWebSocket from "../../hooks/useWebSocket";
import TickerWatchlistRow from "./TickerWatchlistRow";

const STREAM_URL = "wss://stream.binance.us:9443/ws/!ticker@arr";

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

const TickerWatchlist = () => {
  const watchlistList: Record<string, string> = useSelector(
    (state: Record<string, Record<string, string>>) => state.watchlist
  );
  const { message } = useWebSocket(STREAM_URL);
  const [data, setData] = React.useState<TickerStreamPayload[]>([]);

  React.useEffect(() => {
    if (message) {
      // Process and update the UI with the WebSocket data
      const parsedData = JSON.parse(message);

      setData(parsedData);
    }
  }, [message]);

  if (!watchlistList) return null;

  return (
    <div>
      <h3>Watchlist</h3>
      {Object.keys(watchlistList).map((productId) => {
        return (
          <TickerWatchlistRow
            key={productId}
            productId={productId}
            data={data}
          />
        );
      })}
    </div>
  );
};

export default TickerWatchlist;
