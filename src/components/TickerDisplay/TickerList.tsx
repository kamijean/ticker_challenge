import React from "react";
import useApi from "../../hooks/useApi";
import TickerRow, { BinanceTicker } from "./TickerRow";

const FETCH_TICKERS_URL = "https://api.binance.us/api/v3/ticker/24hr";

const TickerList = () => {
  const {
    data: tickers,
    isLoading,
    error,
  } = useApi<BinanceTicker[]>(FETCH_TICKERS_URL);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h3>Product List</h3>
      {tickers &&
        tickers.map((ticker) => (
          <TickerRow key={ticker.symbol} ticker={ticker} />
        ))}
    </div>
  );
};

export default TickerList;
