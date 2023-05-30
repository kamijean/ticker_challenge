import React from 'react';
import { updateWatchlist } from '../reducers/watchlistReducer';
import { useDispatch } from 'react-redux';
import { BinanceTicker } from './TickerDisplay';

type TickerRowProps = {
    ticker: BinanceTicker
}

const TickerRow = ({ticker}: TickerRowProps) => { 
  const dispatch = useDispatch();

  const handleUpdateWatchlist = React.useCallback(() => {
    dispatch(updateWatchlist({ productId: ticker.symbol, baseAmount: ticker.lastPrice, quoteAmount: ticker.quoteVolume }));
  }, [dispatch, ticker.lastPrice, ticker.quoteVolume, ticker.symbol]);

  return (
    <div key={ticker.symbol} onClick={handleUpdateWatchlist}>
      <span>{ticker.symbol}</span>
    </div>     
  );
};
  
export default TickerRow;