import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import useWebSocket from "../../hooks/useWebSocket";
import TickerWatchlistRow, { TickerStreamPayload } from "./TickerWatchlistRow";

const STREAM_URL = "wss://stream.binance.us:9443/ws/!ticker@arr";

const TickerWatchlist = () => {
  const watchlistList = useSelector(
    (state: { watchlist: Record<string, string> }) => state.watchlist
  );
  const { message } = useWebSocket(STREAM_URL);
  const [data, setData] = useState<TickerStreamPayload[]>([]);

  useEffect(() => {
    if (message) {
      const parsedData: TickerStreamPayload[] = JSON.parse(message);
      setData(parsedData);
    }
  }, [message]);

  const watchlistListKeys = useMemo(
    () => Object.keys(watchlistList),
    [watchlistList]
  );

  if (!watchlistList) return null;

  return (
    <div>
      <h3>Watchlist</h3>
      {watchlistListKeys.length > 0 ? (
        watchlistListKeys.map((productId) => (
          <TickerWatchlistRow
            key={productId}
            productId={productId}
            data={data}
          />
        ))
      ) : (
        <p>No tickers selected</p>
      )}
    </div>
  );
};

export default TickerWatchlist;
