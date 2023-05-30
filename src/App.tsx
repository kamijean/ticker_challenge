import React from 'react';
import './App.css';
import TickerDisplay from './components/TickerDisplay';
import PortfolioDisplay from './components/PortfolioDisplay';
import { Provider } from 'react-redux';
import store from './store';


const App = () => {
  return (
    <Provider store={store}>
      <div style={{ display: 'flex'}}>
        <TickerDisplay />
        <PortfolioDisplay />
      </div>
    </Provider>
  );
}

export default App;
