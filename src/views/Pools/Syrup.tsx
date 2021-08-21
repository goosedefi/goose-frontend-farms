import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Heading } from '@pancakeswap-libs/uikit'
import { BLOCKS_PER_YEAR } from 'config'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { useFarms, usePriceBnbBusd, usePools } from 'state/hooks'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import Coming from './components/Coming'
import PoolCard from './components/PoolCard'
import PoolCardLP from './components/PoolCardLP'
import PoolTabButtons from './components/PoolTabButtons'
import Divider from './components/Divider'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID
const Farm: React.FC = () => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const { account } = useWallet()
  const farms = useFarms()
  const pools = usePools(account)
  const bnbPriceUSD = usePriceBnbBusd()
  const block = useBlock()

  const priceToBnb = (tokenName: string, tokenPrice: BigNumber, quoteToken: QuoteToken): BigNumber => {
    const tokenPriceBN = new BigNumber(tokenPrice)
    if (tokenName === 'BNB') {
      return new BigNumber(1)
    }
    if (tokenPrice && quoteToken === QuoteToken.BUSD) {
      return tokenPriceBN.div(bnbPriceUSD)
    }
    return tokenPriceBN
  }

  const poolsWithApy = pools.map((pool) => {
    const isBnbPool = pool.poolCategory === PoolCategory.BINANCE
    // const rewardTokenFarm = farms.find((f) => f.tokenSymbol === pool.quoteTokenSymbol)
    // const stakingTokenFarm = farms.find((s) => s.tokenAddresses[CHAIN_ID] === pool.quoteTokenAdresses[CHAIN_ID])

    // /!\ Assume that the farm quote price is BNB
    // const stakingTokenPriceInBNB = isBnbPool ? new BigNumber(1) : new BigNumber(stakingTokenFarm?.tokenPriceVsQuote)
    // const rewardTokenPriceInBNB = priceToBnb(
    //   pool.tokenName,
    //   rewardTokenFarm?.tokenPriceVsQuote,
    //   rewardTokenFarm?.quoteTokenSymbol,
    // )

    const rewardTokenPrice = new BigNumber(1)
    const stakingTokenPrice = new BigNumber(1)

    const totalRewardPricePerYear = rewardTokenPrice.times(pool.tokenPerBlock).times(BLOCKS_PER_YEAR)
    const totalStakingTokenInPool = stakingTokenPrice.times(getBalanceNumber(pool.totalStaked))
    const apy = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)

    return {
      ...pool,
      isFinished: pool.sousId === 0 ? false : pool.isFinished || block > pool.endBlock,
      apy,
    }
  })

  const [finishedPools, openPools] = partition(poolsWithApy, (pool) => pool.isFinished)

  return (
    <Page>
      <Hero>
          <Heading as="h1" size="xl" mb="16px">
            {TranslateString(282, 'Graze with the great plains and earn BISON')}
          </Heading>
      </Hero>
      <PoolTabButtons />
      <Divider />
      <FlexLayout>
        <Route exact path={`${path}`}>
          {orderBy(openPools, ['sortOrder']).map((pool) => {
            if (pool.earningToken === pool.stakingTokenAddress) {
              return <PoolCard key={pool.sousId} pool={pool} />
            }
            return <PoolCardLP key={pool.sousId} pool={pool} />
          })}
        </Route>
        <Route path={`${path}/history`}>
          {orderBy(finishedPools, ['sortOrder']).map((pool) => {
            if (pool.earningToken === pool.stakingTokenAddress) {
              return <PoolCard key={pool.sousId} pool={pool} />
            }
            return <PoolCardLP key={pool.sousId} pool={pool} />
          })}
        </Route>
      </FlexLayout>
    </Page>
  )
}

const Hero = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  grid-gap: 32px;
  grid-template-columns: 1fr;
  margin-left: auto;
  margin-right: auto;
  padding: 48px 0;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 16px;
    li {
      margin-bottom: 4px;
    }
  }
  img {
    height: auto;
    max-width: 100%;
  }
  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
    margin: 0;
    max-width: none;
  }
`

export default Farm
