import React from 'react'
import { useTranslation } from 'contexts/Localisation'
import { Text } from '@pancakeswap/uikit'

const SafemoonWarning = () => {
  const t = useTranslation()

  return (
    <>
      <Text>To trade SAFEMOON, you must: </Text>
      <Text>• Click on the settings icon</Text>
      <Text mb="24px">• Set your slippage tolerance to 12%+</Text>
      <Text>This is because SafeMoon taxes a 10% fee on each transaction:</Text>
      <Text>• 5% fee = redistributed to all existing holders</Text>
      <Text>• 5% fee = used to add liquidity</Text>
    </>
  )
}

export default SafemoonWarning
