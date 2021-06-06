import React, { useContext } from 'react'
import { Card, CardBody, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { NftProviderContext } from '../contexts/NftProvider'
import InfoRow from './InfoRow'

const NftProgressSimple = () => {
  const TranslateString = useI18n()
  const { balanceOf } = useContext(NftProviderContext)

  return (
    <Card>
      <CardBody>
        <InfoRow>
          <Text>{TranslateString(999, 'My Genesis NFTs')}:</Text>
          <Text>
            <strong>{balanceOf}</strong>
          </Text>
        </InfoRow>
      </CardBody>
    </Card>
  )
}

export default NftProgressSimple
