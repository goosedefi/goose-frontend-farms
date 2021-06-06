import React, { useContext } from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, OpenNewIcon, Text, Link as UIKitLink, Progress } from '@pancakeswap-libs/uikit'
import { BSC_BLOCK_TIME } from 'config'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import getTimePeriods from 'utils/getTimePeriods'
import formatTimePeriod from 'utils/formatTimePeriod'
import { NftProviderContext } from '../contexts/NftProvider'
import InfoRow from './InfoRow'

const TimeLeft = styled(Heading)`
  margin-bottom: 16px;
  text-align: center;
`

const Link = styled(UIKitLink)`
  text-decoration: underline;
`

const Message = styled.p`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  padding-top: 16px;
  text-align: center;
`

const ProgressWrap = styled.div`
  margin-bottom: 16px;
`

const NftProgress = () => {
  const {
    isInitialized,
    currentDistributedSupply,
    totalSupplyDistributed,
    countBurnt,
    startBlockNumber,
    endBlockNumber,
  } = useContext(NftProviderContext)
  const TranslateString = useI18n()
  const currentBlock = useBlock()
  const secondsRemaining = (endBlockNumber - currentBlock) * BSC_BLOCK_TIME

  const timeLeft = formatTimePeriod(getTimePeriods(secondsRemaining), ['seconds'])
  const totalBlocks = endBlockNumber - startBlockNumber
  const progress = currentBlock > startBlockNumber ? ((currentBlock - startBlockNumber) / totalBlocks) * 100 : 5

  return (
    <Card>
      <CardBody>
        <InfoRow>
          <Text>{TranslateString(999, "Total NFT's claimed")}:</Text>
          <Text>
            <strong>{!isInitialized ? '...' : `${currentDistributedSupply}/${totalSupplyDistributed}`}</strong>
          </Text>
        </InfoRow>
      </CardBody>
    </Card>
  )
}

export default NftProgress
