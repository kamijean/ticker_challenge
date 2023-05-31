import { combineReducers } from "redux";
import portfolioReducer from "./portfolioReducer";
import watchlistReducer from "./watchlistReducer";

const rootReducer = combineReducers({
  portfolio: portfolioReducer,
  watchlist: watchlistReducer,
});

export default rootReducer;
