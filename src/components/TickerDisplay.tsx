import React from 'react';
import useApi from '../hooks/useApi';
import TickerWatchlist from './TickerWatchlist';
import TickerRow from './TickerRow';

export type BinanceTicker = {
  symbol: string;
  priceChange: string;  // Absolute price change
  priceChangePercent: string;      // Relative price change in percent
  weightedAvgPrice: string;   // QuoteVolume / Volume
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  lastPrice: string;
  volume: string;
  quoteVolume: string; // Sum of (price * volume) for all trades
  openTime: number,  // Open time for ticker window
  closeTime: number,  // Current Time of the Request
  firstId: number,              // Trade IDs
  lastId: number,
  count: number  
}

type BinanceTickers = BinanceTicker[]

const FETCH_TICKERS_URL = 'https://api.binance.us/api/v3/ticker/24hr'

const TickerDisplay = () => { 
  const { data: tickers, isLoading, error } = useApi<BinanceTickers>(FETCH_TICKERS_URL);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Ticker Display</h2>
      <TickerWatchlist />
      {tickers && tickers.map((ticker) => (
       <TickerRow key={ticker.symbol} ticker={ticker} />
      ))}
    </div>
  );
};
  
export default TickerDisplay;