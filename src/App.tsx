import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { useFetchPublicData } from 'state/hooks'
import styled from 'styled-components'
import { ResetCSS } from '@pantherswap-libs/uikit'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import PageLoader from './components/PageLoader'
import NftGlobalNotification from './views/Nft/components/NftGlobalNotification'

import { ThemeContext, ThemeContextProvider } from './ThemeContext'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page'
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
// const Lottery = lazy(() => import('./views/Lottery'))
// const Pools = lazy(() => import('./views/Pools'))
// const Ifos = lazy(() => import('./views/Ifos'))
const NotFound = lazy(() => import('./views/NotFound'))
// const Nft = lazy(() => import('./views/Nft'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})


const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 32px 16px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  justify-content: center;
  // background-image: url('/images/group-pancake.svg');
  // background-repeat: no-repeat;
  // background-position: bottom 24px center;
  // background-size: 90%;
  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    // background:'radial-gradient(103.12% 50% at 50% 50%, #21193A 0%, #191326 100%)';
    //   url('/images/left-pancake.svg'), url('/images/right-pancake.svg');
    // background-repeat: no-repeat;
    // background-position: center 420px, 10% 230px, 90% 230px;
    // background-size: contain, 266px, 266px;
    min-height: 90vh;
  }
`

const App: React.FC = () => {
  const { account, connect } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])

  useFetchPublicData()

  return (
    <Router>
      <ResetCSS  />
      <GlobalStyle />
      <ThemeContextProvider>
      <Menu >
        <BodyWrapper>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/liquidity-rewards">
              <Farms />
            </Route>
            <Route path="/pools">
              <Farms tokenMode/>
            </Route>
            {/* <Route path="/pools"> */}
            {/*  <Pools /> */}
            {/* </Route> */}
            {/* <Route path="/lottery"> */}
            {/*  <Lottery /> */}
            {/* </Route> */}
            {/* <Route path="/ifo"> */}
            {/*  <Ifos /> */}
            {/* </Route> */}
            {/* <Route path="/nft"> */}
            {/*  <Nft /> */}
            {/* </Route> */}
            {/* Redirect */}
            {/* <Route path="/staking"> */}
            {/*  <Redirect to="/pools" /> */}
            {/* </Route> */}
            {/* <Route path="/syrup"> */}
            {/*  <Redirect to="/pools" /> */}
            {/* </Route> */}
            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </Suspense>
        </BodyWrapper>
      </Menu>
      </ThemeContextProvider>
      <NftGlobalNotification />
    </Router>
  )
}

export default React.memo(App)
