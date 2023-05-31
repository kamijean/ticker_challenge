import React from "react";
import TickerWatchlist from "./TickerWatchlist";
import TickerList from "./TickerList";

const TickerDisplay = () => {
  return (
    <div>
      <TickerWatchlist />
      <TickerList />
    </div>
  );
};

export default TickerDisplay;
