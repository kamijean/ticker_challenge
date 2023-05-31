import React from "react";
import TickerWatchlist from "../WatchlistDisplay/WatchlistDisplay";
import TickerList from "./TickerList";
import styled from "styled-components";

const TickerDisplayWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

const TickerDisplay = () => {
  return (
    <TickerDisplayWrapper>
      <TickerWatchlist />
      <TickerList />
    </TickerDisplayWrapper>
  );
};

export default TickerDisplay;
