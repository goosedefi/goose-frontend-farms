import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useGetStats } from 'hooks/api'
import { useTotalValue } from '../../../state/hooks'
import CardValue from './CardValue'

const StyledTotalStackedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
  background: transparent;
`

const TotalStackedCard = () => {
  const TranslateString = useI18n()
  // const data = useGetStats()
  const totalValue = useTotalValue()
  // const tvl = totalValue.toFixed(2);

  return (
    <StyledTotalStackedCard>
      <CardBody>
        <Heading size="lg" mb="34px">
          The highest rewards!
        </Heading>
        <Heading size="sm" mb="18px">
          Stake, swap, and farm your crypto here
        </Heading>
        <>
          <Heading size="md" mb="4px">
            Total Staked: $
            {totalValue.toNumber().toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Heading>
          <Heading size="md" mb="4px">
            MAX APR: ~
            {Number("17.08").toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Heading>
          <Heading size="md" mb="4px">
            TVL: $
            {totalValue.toNumber().toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Heading>
        </>
      </CardBody>
    </StyledTotalStackedCard>
  )
}

export default TotalStackedCard
