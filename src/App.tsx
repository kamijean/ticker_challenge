import React from "react";
import TickerDisplay from "./components/TickerDisplay/TickerDisplay";
import PortfolioDisplay from "./components/PortfolioDisplay/PortfolioDisplay";
import { Provider } from "react-redux";
import store from "./store";
import styled from "styled-components";

const AppWrapper = styled.div`
  display: flex;
  margin: 20px 30px;
  justify-content: center;
`;

const AppContainer = styled.div`
  display: flex;
  gap: 100px;
  width: 1200px;
`;

const App = () => {
  return (
    <Provider store={store}>
      <AppWrapper>
        <AppContainer>
          <TickerDisplay />
          <PortfolioDisplay />
        </AppContainer>
      </AppWrapper>
    </Provider>
  );
};

export default App;
