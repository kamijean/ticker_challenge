import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useWebSocket from '../hooks/useWebSocket';
import { PortfolioProduct, updateProductAmountBuy, updateProductAmountSell } from '../reducers/portfolioReducer';
import { updateWatchlist } from '../reducers/watchlistReducer';


const STREAM_URL = 'wss://stream.binance.us:9443/ws/!ticker@arr';

type TickerStreamPayload = {
  e: string,   // Event type
  E: Date,     // Event time
  s: string,   // Symbol
  p: string,   // Price change
  P: string,   // Price change percent
  o: string,   // Open price
  h: string,   // High price
  l: string,   // Low price
  c: string,   // Last price
  w: string,   // Weighted average price
  v: string,   // Total traded base asset volume
  q: string,   // Total traded quote asset volume
  O: number,   // Statistics open time
  C: Date,     // Statistics close time
  F: number,   // First trade ID
  L: number,   // Last trade Id
  n: number    // Total number of trades
};

const TickerWatchlist = () => {
  const watchlistList: Record<string, string> = useSelector((state: Record<string, Record<string, string>>) => state.watchlist);
  const { message } = useWebSocket(STREAM_URL);
  const [data, setData] = React.useState<TickerStreamPayload[]>([]);

  React.useEffect(() => {
    if (message) {
      // Process and update the UI with the WebSocket data
      const parsedData = JSON.parse(message);
      
      setData(parsedData);
    }
  }, [message]);

  if(!watchlistList) return null;
  
  return (
    <div>
      {Object.keys(watchlistList).map((ticker) => {
        return <TickerWatchlistRow key={ticker} ticker={ticker} data={data} />
      })}
    </div>
  );
};

type TickerWatchlistRowProps = {
  ticker: string;
  data: TickerStreamPayload[];
}

const TickerWatchlistRow = ({ticker, data}: TickerWatchlistRowProps) => {
  const dispatch = useDispatch();

  const watchlistList: Record<string, PortfolioProduct> = useSelector((state: Record<string, Record<string, PortfolioProduct>>) => state.watchlist);

  const [baseAmount, quoteAmount]  = React.useMemo(() => {
    const tickerRow: TickerStreamPayload | undefined = data.find(item => item.s === ticker)
    return [tickerRow?.c ?? watchlistList[ticker].baseAmount, tickerRow?.q ?? watchlistList[ticker].quoteAmount];
  }, [data, watchlistList, ticker])


  const handleUpdateProductAmountBuy = React.useCallback(() => {
    dispatch(updateProductAmountBuy({ productId: ticker, baseAmount, quoteAmount }));
  }, [baseAmount, dispatch, quoteAmount, ticker]);

  const handleUpdateProductAmountSell = React.useCallback(() => {
    dispatch(updateProductAmountSell({ productId: ticker, baseAmount, quoteAmount }));
  }, [baseAmount, dispatch, quoteAmount, ticker]);

  const handleUpdateWatchlist = React.useCallback(() => {
    dispatch(updateWatchlist({ productId: ticker, baseAmount, quoteAmount }));
  }, [baseAmount, dispatch, quoteAmount, ticker]);

  return (
    <div>
      <span onClick={handleUpdateWatchlist}>{`${ticker}: ${baseAmount}`}</span>
      <button onClick={handleUpdateProductAmountBuy}>Buy</button>
      <button onClick={handleUpdateProductAmountSell}>Sell</button>
    </div>
  )
}


  
export default TickerWatchlist;