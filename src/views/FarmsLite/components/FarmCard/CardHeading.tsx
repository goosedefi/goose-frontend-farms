import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image, Text } from '@pancakeswap-libs/uikit'
import { CommunityTag, CoreTag} from 'components/Tags'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  risk?: number
  depositFee?: number
  farmImage?: string
  tokenSymbol?: string
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 0.25rem;
  }
`
const MultiplierText = styled(Text)`
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
  background-color: 'rgba(0, 32, 96, 1)';
`
const textCol = 'rgba(0, 32, 96, 1)';

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  multiplier,
  risk,
  farmImage,
  tokenSymbol,
  depositFee,
}) => {
  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      <Image src={`/images/farms/${farmImage}.png`} alt={tokenSymbol} width={64} height={64} />
      <Flex flexDirection="column" alignItems="flex-end">
        <Heading color={textCol} mb="4px">{lpLabel}</Heading>
        <Flex justifyContent="center">
          { /* depositFee === 0 ? <NoFeeTag /> : null */ }
          {/* {isCommunityFarm ? <CommunityTag /> : <CoreTag />} */}
          {/* <RiskTag risk={risk} /> */}
          <MultiplierTag variant="secondary">
            <MultiplierText color='rgba(142, 0, 0, 1)'>{multiplier}</MultiplierText>
            </MultiplierTag>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
