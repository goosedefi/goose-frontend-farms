import React, { useCallback, useState, useEffect } from 'react';
import BigNumber from 'bignumber.js';
import styled from 'styled-components';
import { useModal, AddIcon, Image } from '@pancakeswap-libs/uikit';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import { useQuery } from "@apollo/client";

import UnlockButton from 'components/UnlockButton'
import Label from 'components/Label'
import Balance from 'components/Balance'
import Button from 'components/Button';

import { useERC20, useLP } from 'hooks/useContract'
import { useSousApprove } from 'hooks/useApprove'
import useI18n from 'hooks/useI18n'
import { useSousStake } from 'hooks/useStake'
import { useSousUnstake } from 'hooks/useUnstake'
import useBlock from 'hooks/useBlock'
import { useSousHarvest } from 'hooks/useHarvest'
import useGetLpTokenPrice from 'hooks/useGetLpTokenPrice'
import { useBnbPriceState } from 'hooks/useBnbPrice';

import { getBalanceNumber } from 'utils/formatBalance'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import { Pool } from 'state/types'
import { usePriceBnbBusd, useBISONPrice } from 'state/hooks'
import { getPoolApr } from 'utils/apr'

import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import CompoundModal from './CompoundModal'
import CardTitle from './CardTitle'
import Card from './Card'
import OldSyrupTitle from './OldSyrupTitle'
import HarvestButton from './HarvestButton'
import CardFooter from './CardFooter'
import { BISON_PRICE } from '../../../constants/graph.constants'

interface HarvestProps {
  pool: Pool
}

const CustomCardTitle = styled(CardTitle)`
  font-size: 22px;
  color: #ffffff
`

const PoolCard: React.FC<HarvestProps> = ({ pool }) => {
  const {
    sousId,
    image,
    poolName,
    tokenName,
    stakingTokenName,
    stakingTokenAddress,
    projectLink,
    harvest,
    tokenDecimals,
    poolCategory,
    totalStaked,
    startBlock,
    endBlock,
    isFinished,
    userData,
    stakingLimit,
  } = pool
  // Pools using native BNB behave differently than pools using a token
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const TranslateString = useI18n()
  const stakingTokenContract = useERC20(stakingTokenAddress)
  const lpTokenContract = useLP(stakingTokenAddress)
  const { binancecoin } = useBnbPriceState();

  const [totalSupply, setTotalSupply] = useState(new BigNumber(0))

  const [reserve0, setReserve0] = useState(new BigNumber(0))
  const [reserve1, setReserve1] = useState(new BigNumber(0))

  const [token0, setToken0] = useState()
  const [token1, setToken1] = useState()

  const { account } = useWallet()
  const block = useBlock()
  const { onApprove } = useSousApprove(stakingTokenContract, sousId)
  const { onStake } = useSousStake(sousId, isBnbPool)
  const { onUnstake } = useSousUnstake(sousId)
  const { onReward } = useSousHarvest(sousId, isBnbPool)
  const { lpTokenPriceUsd } = useGetLpTokenPrice({lpTokenContract})
  const { data } = useQuery(BISON_PRICE);

  const token0price = useBISONPrice()
  const token1price = usePriceBnbBusd()
  const rewardTokenPrice = useBISONPrice()

  const [requestedApproval, setRequestedApproval] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)

  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const earnings = new BigNumber(userData?.pendingReward || 0)

  const blocksUntilStart = Math.max(startBlock - block, 0)
  const blocksRemaining = Math.max(endBlock - block, 0)
  const isOldSyrup = stakingTokenName === QuoteToken.SYRUP
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber() && !isBnbPool
  const isCardActive = isFinished && accountHasStakedBalance
  const singleStake = false

  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(tokenDecimals))
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
      onConfirm={onStake}
      tokenName={stakingLimit ? `${stakingTokenName} (${stakingLimit} max)` : stakingTokenName}
    />,
  )

  const [onPresentCompound] = useModal(
    <CompoundModal earnings={earnings} onConfirm={onStake} tokenName={stakingTokenName} />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={stakingTokenName} />,
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, setRequestedApproval])

  useEffect(() => {
    if (stakingTokenAddress !== undefined) {
      lpTokenContract.methods
        .token0()
        .call()
        .then((res0) => {
          setToken0(res0)
          lpTokenContract.methods
            .token1()
            .call()
            .then((res1) => {
              setToken1(res1)
              lpTokenContract.methods
                .totalSupply()
                .call()
                .then((res2) => {
                  setTotalSupply(new BigNumber(res2))
                  lpTokenContract.methods
                    .getReserves()
                    .call()
                    .then((reserves) => {
                      setReserve0(new BigNumber(getBalanceNumber(reserves._reserve0)))
                      setReserve1(new BigNumber(getBalanceNumber(reserves._reserve1)))
                    })
                })
            })
        })
    }
  }, [lpTokenContract, stakingTokenAddress])

  const getApr = useCallback(() => {

    let baseValue;
    let quoteValue;
    if(pool.poolName !== 'biAPE-BNB APE') {
      baseValue = new BigNumber(token0price).times(reserve0)
      quoteValue = new BigNumber(token1price).times(reserve1)
    } else {
      baseValue = new BigNumber(token0price).times(reserve1)
      quoteValue = new BigNumber(token1price).times(reserve0)
    }
    const totalValue = baseValue.plus(quoteValue)
    const lpTokenPrice = totalValue.div(getBalanceNumber(totalSupply)).times(token0price);

    const apr = getPoolApr(
      lpTokenPrice,
      rewardTokenPrice,
      getBalanceNumber(pool.totalStaked, pool.tokenDecimals),
      parseFloat(pool.tokenPerBlock),
    )
    return new BigNumber(apr);

}, [pool.tokenDecimals, pool.tokenPerBlock, pool.totalStaked, pool.poolName, reserve0, reserve1, rewardTokenPrice, token0price, token1price, totalSupply])

const apy = getApr();

  return (
    <Card
      isActive={isCardActive}
      isFinished={isFinished && sousId !== 0}
    >
      {isFinished && sousId !== 0 && <PoolFinishedSash />}
      <div style={{ padding: '24px' }}>
        <CustomCardTitle isFinished={isFinished && sousId !== 0}>
          {isOldSyrup && '[OLD]'} {poolName} {TranslateString(348, 'Pool')}
        </CustomCardTitle>
        <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <Image src={`/images/tokens/${poolName === 'biAPE-BNB APE' ? 'biAPE' :image || tokenName}.png`} width={64} height={64} alt={tokenName} />
          </div>
          {account && harvest && !isOldSyrup && (
            <HarvestButton
              disabled={!earnings.toNumber() || pendingTx}
              text={pendingTx ? 'Collecting' : 'Harvest'}
              onClick={async () => {
                setPendingTx(true)
                await onReward()
                setPendingTx(false)
              }}
            />
          )}
        </div>
        {!isOldSyrup ? (
          <BalanceAndCompound>
            <Balance value={getBalanceNumber(earnings, tokenDecimals)} isDisabled={isFinished} />
            {sousId === 0 && account && harvest && (
              <HarvestButton
                disabled={!earnings.toNumber() || pendingTx}
                text={pendingTx ? TranslateString(999, 'Compounding') : TranslateString(999, 'Compound')}
                onClick={onPresentCompound}
              />
            )}
          </BalanceAndCompound>
        ) : (
          <OldSyrupTitle hasBalance={accountHasStakedBalance} />
        )}
        <Label isFinished={isFinished && sousId !== 0} text={TranslateString(330, `${tokenName} earned`)} />
        <StyledCardActions>
          {!account && <UnlockButton />}
          {account &&
            (needsApproval && !isOldSyrup ? (
              <div style={{ flex: 1 }}>
                <Button disabled={isFinished || requestedApproval} onClick={handleApprove} outLine>
                  Approve
                </Button>
              </div>
            ) : (
              <>
                <Button
                  disabled={stakedBalance.eq(new BigNumber(0)) || pendingTx}
                  outLine
                  onClick={
                    isOldSyrup
                      ? async () => {
                          setPendingTx(true)
                          await onUnstake('0')
                          setPendingTx(false)
                        }
                      : onPresentWithdraw
                  }
                >
                  Unstake
                </Button>
                <StyledActionSpacer />
                {!isOldSyrup && (
                  <Button disabled={isFinished && sousId !== 0} onClick={onPresentDeposit} outLine>
                    <AddIcon/>
                  </Button>
                )}
              </>
            ))}
        </StyledCardActions>
        <StyledDetails>
          <div style={{ flex: 1,  color: '#DAA10E' }}>{TranslateString(736, 'APR')}:</div>
          {isFinished || isOldSyrup || !apy || apy?.isNaN() || !apy?.isFinite() ? (
            '-'
          ) : (
            <Balance fontSize="14px" isDisabled={isFinished} value={apy?.toNumber()} decimals={2} unit="%" />
          )}
        </StyledDetails>
        <StyledDetails>
          <div style={{ flex: 1, color: '#DAA10E' }}>
            <span role="img" aria-label={stakingTokenName}>
              {' '}
            </span>
            {TranslateString(384, 'Your Stake')}:
          </div>
          <Balance fontSize="14px" isDisabled={isFinished} value={getBalanceNumber(stakedBalance)} />
        </StyledDetails>
        <StyledDetails>
          <div style={{ flex: 1, color: '#DAA10E' }}>
            <span role="img" aria-label={stakingTokenName}>
              {' '}
            </span>
            Staked value:
          </div>
          <div style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
            ~ ${lpTokenPriceUsd && stakedBalance.div(1e18).multipliedBy(lpTokenPriceUsd).toFixed(2)}
          </div>
        </StyledDetails>
        <StyledDetails>
          <div style={{ flex: 1, color: '#DAA10E', lineHeight: '25px' }}>
            <span role="img" aria-label={stakingTokenName}>
              {' '}
            </span>
            Earned value:
          </div>
          <div style={{ color: '#FFFFFF', fontWeight: 'bold', lineHeight: '25px' }}>
            ~ ${data?.token &&
            new BigNumber(data?.token?.derivedETH).times(binancecoin?.usd).multipliedBy(earnings.div(1e18)).toFixed(2)
            }
          </div>
        </StyledDetails>
      </div>
      <CardFooter
        poolName={poolName}
        projectLink={projectLink}
        totalStaked={totalStaked}
        blocksRemaining={blocksRemaining}
        isFinished={isFinished}
        blocksUntilStart={blocksUntilStart}
        poolCategory={poolCategory}
        stakingTokenName={stakingTokenName}
        singleStake={singleStake}
      />
    </Card>
  )
}

const PoolFinishedSash = styled.div`
  background-image: url('/images/pool-finished-sash.svg');
  background-position: top right;
  background-repeat: not-repeat;
  height: 135px;
  position: absolute;
  right: -24px;
  top: -24px;
  width: 135px;
`

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
  width: 100%;
  box-sizing: border-box;
`

const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  display: flex;
  font-size: 14px;
`

export default PoolCard
