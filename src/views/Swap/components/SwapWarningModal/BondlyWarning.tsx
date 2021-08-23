import React from 'react'
import { Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localisation'

const BondlyWarning = () => {
  const { t } = useTranslation()

  return <Text>{t('Warning: BONDLY has been compromised. Please remove liqudity until further notice.')}</Text>
}

export default BondlyWarning
