import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, IconButton, useModal, AddIcon, Image, Flex, Heading, Text, Link, LinkExternal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import Label from 'components/Label'
import { useERC20 } from 'hooks/useContract'
import { useSousApprove } from 'hooks/useApprove'
import useI18n from 'hooks/useI18n'
import { useSousStake } from 'hooks/useStake'
import { useSousUnstake } from 'hooks/useUnstake'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { useSousHarvest } from 'hooks/useHarvest'
import Balance from 'components/Balance'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import { Pool } from 'state/types'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import CompoundModal from './CompoundModal'
import CardTitle from './CardTitle'
import Card from './Card'
import OldSyrupTitle from './OldSyrupTitle'
import HarvestButton from './HarvestButton'
import CardFooter from './CardFooter'

const CardBottomContent = styled.div`
  padding:15px;
  backgroudn:red !important;
  text-align:left;
  flex-direcion:row;
  display:flex;
  justify-content:space-between;
  flex:1 1;
  .cardContent{
  }
  .textTitle{
    color:#fff;
    font-size:12px;
  }
`

const StyledHarvestButton = styled.button`
  background:#000;
  border:1px solid #30BAC6;
  padding:8px 12px;
  font-size:14px;
  color:#fff;
  border-radius:6px;
  margin-top:10px;
  transition:0.25s all;
  cursor:pointer;
  &:hover{
    border:1px solid #6CF3FF;
  }
`

const PCard = styled.div`
  align-self: baseline;
  background: #17171F;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  text-align: center;
`

const StyledCardAccent = styled.div`
  background: linear-gradient(45deg,
  rgba(255, 0, 0, 1) 0%,
  rgba(255, 154, 0, 1) 10%,
  rgba(208, 222, 33, 1) 20%,
  rgba(79, 220, 74, 1) 30%,
  rgba(63, 218, 216, 1) 40%,
  rgba(47, 201, 226, 1) 50%,
  rgba(28, 127, 238, 1) 60%,
  rgba(95, 21, 242, 1) 70%,
  rgba(186, 12, 248, 1) 80%,
  rgba(251, 7, 217, 1) 90%,
  rgba(255, 0, 0, 1) 100%);
  background-size: 300% 300%;
  border-radius: 20px;
  position: absolute;
  top: -1px;
  right: -1px;
  bottom: -1px;
  left: -1px;
  z-index: -1;
`

interface PoolWithApy extends Pool {
  apy: BigNumber
}

interface HarvestProps {
  pool: PoolWithApy
}

const CardHeadingWrapper = styled(Flex)`
  padding:30px 20px;
  background:#0E0E14;
  border-radius:20px;
  svg {
    margin-right: 0.25rem;
  }
`

const HeadingWrapper = styled(Heading)`
  color:#fff;
`

const AprWrapper = styled.div`
  text-align:left;
  font-size:22px;
  font-weight:600;
  margin-top:20px;
  color:#30BAC6;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

const DetailsWrapper = styled.div`
  margin-top: 24px;
`

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;

  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const PoolCard: React.FC<HarvestProps> = ({ pool }) => {
  const {
    sousId,
    image,
    tokenName,
    stakingTokenName,
    stakingTokenAddress,
    projectLink,
    harvest,
    apy,
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
  const { account } = useWallet()
  const block = useBlock()
  const { onApprove } = useSousApprove(stakingTokenContract, sousId)
  const { onStake } = useSousStake(sousId, isBnbPool)
  const { onUnstake } = useSousUnstake(sousId)
  const { onReward } = useSousHarvest(sousId, isBnbPool)

  const [showExpandableSection, setShowExpandableSection] = useState(false)

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

  return (
    <PCard>
      <StyledCardAccent />
      <CardHeadingWrapper justifyContent="space-between" alignItems="left" mb="12px" flexDirection="column">
        <Flex flexDirection="row" alignItems="flex-end" justifyContent="space-between" >
          <HeadingWrapper mb="4px" >{isOldSyrup && '[OLD]'} {tokenName} {TranslateString(348, 'Pool')}</HeadingWrapper>
          <Image src={`/images/tokens/${image || tokenName}.png`} alt={tokenName} width={38} height={38} />
        </Flex>
        <AprWrapper>
        {isFinished || isOldSyrup || !apy || apy?.isNaN() || !apy?.isFinite() ? (
            '- %'
          ) : (
            <Balance fontSize="14px" isDisabled={isFinished} value={apy?.toNumber()} decimals={2} unit="%" />
          )} APR
        </AprWrapper>
      </CardHeadingWrapper>
      <CardBottomContent>
        <div className="cardContent">
          <Text className="textTitle">Rewards Earned</Text>
          <Text bold style={{ fontSize: '20px', color: '#30BAC6' }}>3,534 HIGH</Text>
        </div>
        <div>
          <StyledHarvestButton>Harvest</StyledHarvestButton>
        </div>
      </CardBottomContent>
      <CardBottomContent>
        <div className="cardContent">
          <Text className="textTitle">{tokenName} Deposited</Text>
          <Text bold style={{ fontSize: '20px', color: '#30BAC6' }}>{getBalanceNumber(stakedBalance)}</Text>
        </div>
        <div>
          <StyledHarvestButton>Harvest</StyledHarvestButton>
        </div>
      </CardBottomContent>
      <div style={{ padding: '24px 24px 0px 24px' }}>
        <StyledCardActions>
          {!account && <UnlockButton mt="8px" fullWidth />}
          {account &&
            (needsApproval && !isOldSyrup ? (
              <div style={{ flex: 1 }}>
                <Button disabled={isFinished || requestedApproval} onClick={handleApprove} fullWidth>
                  {`Approve ${stakingTokenName}`}
                </Button>
              </div>
            ) : (
              <>
                <Button
                  disabled={stakedBalance.eq(new BigNumber(0)) || pendingTx}
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
                  {`Unstake ${stakingTokenName}`}
                </Button>
                <StyledActionSpacer />
                {!isOldSyrup && (
                  <IconButton disabled={isFinished && sousId !== 0} onClick={onPresentDeposit}>
                    <AddIcon color="background" />
                  </IconButton>
                )}
              </>
            ))}
        </StyledCardActions>
      </div>
      <ExpandableSectionButton
        onClick={() => setShowExpandableSection(!showExpandableSection)}
        expanded={showExpandableSection}
      />
      <ExpandingWrapper expanded={showExpandableSection}>
        <DetailsWrapper>
          <Flex justifyContent="space-between">
            <Text>{TranslateString(316, 'Stake')}:</Text>
            <StyledLinkExternal href={
                `https://app.pangolin.exchange/#/swap/${stakingTokenAddress[process.env.REACT_APP_CHAIN_ID]}`
            }>
              {stakingTokenName}
            </StyledLinkExternal>
          </Flex>
          {!isFinished && (
            <Flex justifyContent="space-between">
              <Text>{TranslateString(23, 'Total Liquidity')}:</Text>
              <Text>{totalStaked}</Text>
            </Flex>
          )}
          <Flex justifyContent="flex-start">
            <Link external href={`https://bscscan.com/token/${stakingTokenAddress[process.env.REACT_APP_CHAIN_ID]}`} bold={false}>
              {TranslateString(356, 'View on BscScan')}
            </Link>
          </Flex>
        </DetailsWrapper>
      </ExpandingWrapper>
    </PCard>
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
