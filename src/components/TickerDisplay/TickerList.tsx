import React from "react";
import useApi from "../../hooks/useApi";
import TickerRow, { BinanceTicker } from "./TickerRow";
import Card from "../common/Card";

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
    <Card>
      <h3>Product List</h3>
      {tickers &&
        tickers.map((ticker) => (
          <TickerRow key={ticker.symbol} ticker={ticker} />
        ))}
    </Card>
  );
};

export default TickerList;
