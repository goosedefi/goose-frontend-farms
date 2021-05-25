import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import CardValue from './CardValue'
import { useFarms, useSTOSPrice, useTotalSupplyPrice } from '../../../state/hooks'

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const CakeStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupplyPrice()
  const farms = useFarms()
  const price = useSTOSPrice()
  const marketCap = price.times(totalSupply)

  let eggPerBlock = 0
  if (farms && farms[0] && farms[0].eggPerBlock) {
    eggPerBlock = new BigNumber(farms[0].eggPerBlock).div(new BigNumber(10).pow(18)).toNumber()
  }

  return (
    <StyledCakeStats>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(534, 'STOS Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{TranslateString(10005, 'Market Cap')}</Text>
          <CardValue fontSize="14px" value={(marketCap.toNumber())} decimals={0} prefix="$" />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'Total Minted')}</Text>
          {totalSupply && <CardValue fontSize="14px" value={0} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(538, 'Total Burned')}</Text>
          <CardValue fontSize="14px" value={0} decimals={0} />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(10004, 'Circulating Supply')}</Text>
          {totalSupply && <CardValue fontSize="14px" value={totalSupply.toNumber()} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(540, 'New STOS/block')}</Text>
          <Text bold fontSize="14px">
            {0}
          </Text>
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
