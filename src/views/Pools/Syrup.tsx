import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { BLOCKS_PER_YEAR } from 'config'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePools } from 'state/hooks'
import Page from 'components/layout/Page'
import { Grid } from '@material-ui/core'
import PoolCard from './components/PoolCard'
import PoolCardLP from './components/PoolCardLP'
import PoolTabButtons from './components/PoolTabButtons'
import Divider from './components/Divider'

const Farm: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const pools = usePools(account)
  const block = useBlock()

  const poolsWithApy = pools.map((pool) => {
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
    <>
      <Banner />
      <Page>
        <PoolTabButtons />
        <Divider />
        <Grid container spacing={3}>
          <Route exact path={`${path}`}>
            {orderBy(openPools, ['sortOrder']).map((pool) => {
              if (pool.earningToken === pool.stakingTokenAddress) {
                return (
                  <Grid item lg={4} xs={12}>
                    <PoolCard key={pool.sousId} pool={pool} />
                  </Grid>
                )
              }
              return (
                <Grid item lg={4} xs={12}>
                  <PoolCardLP key={pool.sousId} pool={pool} />
                </Grid>
              )
            })}
          </Route>
          <Route path={`${path}/history`}>
            {orderBy(finishedPools, ['sortOrder']).map((pool) => {
              if (pool.earningToken === pool.stakingTokenAddress) {
                return (
                  <Grid item lg={4} xs={12}>
                    <PoolCard key={pool.sousId} pool={pool} />
                  </Grid>
                )
              }
              return (
                <Grid item lg={4} xs={12}>
                  <PoolCardLP key={pool.sousId} pool={pool} />
                </Grid>
              )
            })}
          </Route>
        </Grid>
      </Page>
    </>
  )
}

const Banner = styled.div`
  background-image: url('Graze-fade.jpg');
  height: 300px;
  width: 100%;
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 40px;
  font-weight: 600;

  @media (max-width: 576px) {
    font-size: 20px;
    height: 100px;
  }
`

export default Farm
