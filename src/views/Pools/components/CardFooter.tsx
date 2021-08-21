import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import { ChevronDown, ChevronUp } from 'react-feather'
import Balance from 'components/Balance'
import { CommunityTag, CoreTag, BinanceTag, RewardsTag } from 'components/Tags'
import { PoolCategory } from 'config/constants/types'

const tags = {
  [PoolCategory.BINANCE]: BinanceTag,
  [PoolCategory.CORE]: CoreTag,
  [PoolCategory.COMMUNITY]: CommunityTag,
  [PoolCategory.REWARDS]: RewardsTag,
}

interface Props {
  projectLink: string
  totalStaked: BigNumber
  blocksRemaining: number
  isFinished: boolean
  blocksUntilStart: number
  poolCategory: PoolCategory
  stakingTokenName: string
  singleStake: boolean
}

const StyledFooter = styled.div<{ isFinished: boolean }>`
  border-top: 1px solid ${({ theme }) => (theme.isDark ? '#524B63' : '#E9EAEB')};
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled2' : 'primary2']};
  padding: 24px;
`

const StyledDetailsButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: 0;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  display: inline-flex;
  font-size: 16px;
  font-weight: 600;
  height: 32px;
  justify-content: center;
  outline: 0;
  padding: 0;
  &:hover {
    opacity: 0.9;
  }

  & > svg {
    margin-left: 4px;
  }
`

const Details = styled.div`
  margin-top: 24px;
`

const Row = styled.div`
  align-items: center;
  display: flex;
`

const FlexFull = styled.div`
  flex: 1;
`
const Label = styled.div`
  font-size: 14px;
`
const TokenLink = styled.a`
  font-size: 14px;
  text-decoration: none;
  color: white;
`

const CardFooter: React.FC<Props> = ({
  projectLink,
  totalStaked,
  blocksRemaining,
  isFinished,
  blocksUntilStart,
  poolCategory,
  stakingTokenName,
  singleStake
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const TranslateString = useI18n()
  const Icon = isOpen ? ChevronUp : ChevronDown

  const handleClick = () => setIsOpen(!isOpen)
  const Tag = tags[poolCategory]

  return (
    <StyledFooter isFinished={isFinished}>
      <Row>
        <FlexFull>
          <Tag />
        </FlexFull>
        <StyledDetailsButton onClick={handleClick}>
          {isOpen ? 'Hide' : 'Details'} <Icon />
        </StyledDetailsButton>
      </Row>
      {isOpen && (
        <Details>
          <Row style={{ marginBottom: '4px' }}>
            <FlexFull>
              <Label>
                <span role="img" aria-label="syrup">
                  🥞{' '}
                </span>
                Total {stakingTokenName} Staked
              </Label>
            </FlexFull>
            <Balance fontSize="14px" isDisabled={isFinished} value={getBalanceNumber(totalStaked)} />
          </Row>
          {/* {blocksUntilStart > 0 && (
            <Row>
              <FlexFull>
                <Label>{TranslateString(410, 'Start')}:</Label>
              </FlexFull>
              <Balance fontSize="14px" isDisabled={isFinished} value={blocksUntilStart} decimals={0} />
            </Row>
          )} */}
          {blocksRemaining > 0 && (
            <Row>
              <FlexFull>
                <Label>{TranslateString(410, 'Remaining Blocks')}:</Label>
              </FlexFull>
              <Balance fontSize="14px" isDisabled={isFinished} value={blocksRemaining} decimals={0} />
            </Row>
          )}
          {singleStake && <Row>
            <FlexFull>
              Stake your BISON to earn more BISON rewards and be eligible for the weekly platform distribution.
            </FlexFull>
          </Row>}
          {!singleStake && <TokenLink href={projectLink} target="_blank">
            {TranslateString(412, 'LP Staking')}
          </TokenLink>}
        </Details>
      )}
    </StyledFooter>
  )
}

export default React.memo(CardFooter)
