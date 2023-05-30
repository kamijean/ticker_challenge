import { configureStore } from '@reduxjs/toolkit';
import portfolioReducer from './reducers/portfolioReducer';
import watchlistReducer from './reducers/watchlistReducer';

const store = configureStore({
    reducer: {
      portfolio: portfolioReducer,
      watchlist: watchlistReducer,
    },
  });

export default store;