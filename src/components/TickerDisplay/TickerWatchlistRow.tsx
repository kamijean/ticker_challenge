import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PortfolioProduct } from "../../reducers/portfolioReducer";
import { updateWatchlist } from "../../reducers/watchlistReducer";
import { TickerStreamPayload } from "./TickerWatchlist";
import BuySellButtons from "./BuySellButtons";
import styled from "styled-components";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

type TickerWatchlistRowProps = {
  productId: string;
  data: TickerStreamPayload[];
};

const WatchlistWrapper = styled.div`
  padding: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: space-between;
`;

const WatchlistDetailsWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 220px;
  justify-content: space-between;
  margin-right: 20px;
`;

const TickerWatchlistRow = ({ productId, data }: TickerWatchlistRowProps) => {
  const dispatch = useDispatch();

  const watchlistList: Record<string, PortfolioProduct> = useSelector(
    (state: Record<string, Record<string, PortfolioProduct>>) => state.watchlist
  );

  const [baseAmount, quoteAmount] = React.useMemo(() => {
    const tickerRow: TickerStreamPayload | undefined = data.find(
      (item) => item.s === productId
    );
    return [
      tickerRow?.c ?? watchlistList[productId].baseAmount,
      tickerRow?.q ?? watchlistList[productId].quoteAmount,
    ];
  }, [data, watchlistList, productId]);

  const handleUpdateWatchlist = React.useCallback(() => {
    dispatch(updateWatchlist({ productId, baseAmount, quoteAmount }));
  }, [baseAmount, dispatch, quoteAmount, productId]);

  return (
    <WatchlistWrapper>
      <FavoriteOutlinedIcon />
      <WatchlistDetailsWrapper onClick={handleUpdateWatchlist}>
        <span>{productId}</span>
        <span>{baseAmount}</span>
      </WatchlistDetailsWrapper>
      <BuySellButtons
        baseAmount={baseAmount}
        quoteAmount={quoteAmount}
        productId={productId}
      />
    </WatchlistWrapper>
  );
};

export default TickerWatchlistRow;
