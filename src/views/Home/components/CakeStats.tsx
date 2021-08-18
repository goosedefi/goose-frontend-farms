import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import { useFarms, usePriceCakeBusd } from '../../../state/hooks'

const StyledQTStats = styled(Card)`
  background: radial-gradient(ellipse at center, rgb(202, 202, 202) 10%, rgb(248, 239, 225) 100%);
  transparency: 0.5;
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 30px;
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
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const farms = useFarms();
  const eggPrice = usePriceCakeBusd();
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0);
  const cakeSupply = getBalanceNumber(circSupply);
  const marketCap = eggPrice.times(circSupply);

  let eggPerBlock = 0;
  if(farms && farms[0] && farms[0].eggPerBlock){
    eggPerBlock = new BigNumber(farms[0].eggPerBlock).div(new BigNumber(10).pow(18)).toNumber();
  }

  const headerCol = 'rgba(0, 32, 96, 1)';
  const bodyCol = 'black';
  const number = 'rgba(142, 0, 0, 1)';
  return (
    <StyledQTStats>
      <CardBody>
        <Heading size="xl" mb="24px" color={headerCol}>
          Quant Token Stats
        </Heading>
        <Row>
          <Text fontSize="14px" color={bodyCol}>Market Cap</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(marketCap)} decimals={0} prefix="$" />
        </Row>
        <Row>
          <Text fontSize="14px" color={bodyCol}>Total Minted</Text>
          {totalSupply && <CardValue fontSize="14px" value={getBalanceNumber(totalSupply)} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px" color={bodyCol}>Total Burned</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(burnedBalance)} decimals={0} />
        </Row>
        <Row>
          <Text fontSize="14px" color={bodyCol}>Circulating Supply</Text>
          {cakeSupply && <CardValue fontSize="14px" value={cakeSupply} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px" color={bodyCol} >New QT/block</Text>
          <Text color={number} bold fontSize="14px">{eggPerBlock}</Text>
        </Row>
      </CardBody>
    </StyledQTStats>
  )
}

export default CakeStats
