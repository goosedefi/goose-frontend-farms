import React, { useContext } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { languages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import { usePriceCakeBusd } from 'state/hooks'
import { Menu as UikitMenu } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import config from './config'




const Menu = (props) => {
  const { account, connect, reset } = useWallet()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const cakePriceUsd = usePriceCakeBusd()

  const textCol ='black';

/*
const styleX = styled.div`
background: url('https://icons.iconarchive.com/icons/designcontest/ecommerce-business/256/bar-chart-icon.png');
background-position: right;
justify-content: center;
background-repeat: no-repeat;
`
*/

  return (
    <UikitMenu 
      innerProps={{ style: { margin: '0', width: '100%' } }}
      background= 'radial-gradient(103.12% 50% at 50% 50%, #21193A 0%, #191326 100%)'
      
      index={2}
      hasCurvedDivider={false}
      account={account}
      login={connect}
      logout={reset}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage && selectedLanguage.code}
      langs={languages}
      setLang={setSelectedLanguage}
      cakePriceUsd={cakePriceUsd.toNumber()}
      links={config}
      priceLink="https://www.coingecko.com/en/coins/goose-finance"
      {...props}
    />
  )
}

export default Menu

