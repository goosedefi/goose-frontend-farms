import React, { useEffect, Suspense, lazy, memo, FC } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { useFetchPublicData, useFetchPriceData, useFetchTotalSupplyData } from 'state/hooks'
import GlobalStyle from './style/Global'

import PageLoader from './components/PageLoader'
import Layout from './views/Layout';
import ConnectWallet from './views/ConnectWallet';

const Pools = lazy(() => import('./views/Pools'))
const NotFound = lazy(() => import('./views/NotFound'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: FC = () => {
  const { account, connect } = useWallet();
   useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect]);

  useFetchPublicData()

  useFetchPriceData()

  useFetchTotalSupplyData()

  return (
    <Router>
        <ResetCSS />
        <GlobalStyle />
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Switch>
              <Route path="/">
                <div style={{ minHeight: 'calc(100vh - 250px)'}}>
                   {account
                      ? <Pools />
                      : <ConnectWallet/>
                   }
                </div>
              </Route>
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Layout>
    </Router>
  )
}

export default memo(App)
