import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ERC20TokenWrapper from "./components/ERC20Token/ERC20TokenWrapper";
import MainContent from "./components/MainContent";
import Loader from "./components/Loader";
import IndexStrategyWrapper from "./components/IndexStrat/IndexStrategyWrapper";
import TokenMintingPage from './components/ERC20Token/ReuseERC20Token/TokenMintingPage';
import ERC20Dashboard from './components/DashBoard/ERC20Dashboard';
import MainDashboard from './components/DashBoard/MainDashboard';

const App = () => {
  const [loader, setloader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setloader(false);
    }, 2400);
  }, []);

  return (
    <Router>
      <div className="w-full h-screen">
        {loader ? (
          <Loader />
        ) : (
          <>
            <Header />
            <div className="flex-grow flex">
              <Sidebar/>
              <Switch>
                <Route exact path="/">
                  <MainContent />
                </Route>
                <Route path="/erc20">
                  <ERC20TokenWrapper />
                </Route>
                <Route path="/indexStrategy">
                  <IndexStrategyWrapper />
                </Route>
                <Route path="/dashboard">
                  <MainDashboard />
                </Route>
                <Route path='/erc20tokendashboard'>
                  <ERC20Dashboard />
                </Route>
                <Route path='/mint-token/:tokenAddress'>
                  <TokenMintingPage />
                </Route>
              </Switch>
            </div>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
