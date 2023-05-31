import React from "react";
import useApi from "../../hooks/useApi";
import TickerRow, { BinanceTicker } from "./TickerRow";
import Card from "../common/Card";
import styled from "styled-components";

const FETCH_TICKERS_URL = "https://api.binance.us/api/v3/ticker/24hr";

const TickerListyWrapper = styled.div`
  height: 700px;
  overflow: scroll;
`;

const TickerList = () => {
  const {
    data: tickers,
    isLoading,
    error,
  } = useApi<BinanceTicker[]>(FETCH_TICKERS_URL);

  if (isLoading) {
    return <Card>Loading...</Card>;
  }

  if (error) {
    return <Card>Error: {error.message}</Card>;
  }

  return (
    <Card>
      <TickerListyWrapper>
        <h3>Product List</h3>
        {/* TODO Kami: Add a search */}
        {tickers &&
          tickers.map((ticker) => (
            <TickerRow key={ticker.symbol} ticker={ticker} />
          ))}
      </TickerListyWrapper>
    </Card>
  );
};

export default TickerList;
