import React, { useContext } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import { usePriceCakeBusd } from 'state/hooks'
import { Menu as UikitMenu } from '@pancakeswap-libs/uikit'
import config from './config'

const ZERO = new BigNumber(0)

let STOSValue = ZERO
fetch(
  'https://api.stosentertainment.com/price-bnbpool.php?key=236547643&pool=0xe0e3f3698ba35487e5285fdfd31a5b8d8f564d8b&token=0x9eab0a93b0cd5d904493694f041bdcedb97b88c6&decimals=18',
)
  .then((res) => res.json())
  .then(
    (result) => {
      if (result.status === true) {
        STOSValue = new BigNumber(result.data)
      } else {
        STOSValue = ZERO
      }
    },
    (error) => {
      STOSValue = ZERO
    },
  )
  .catch(() => {
    STOSValue = ZERO
  })

const Menu = (props) => {
  const { account, connect, reset } = useWallet()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()

  return (
    <UikitMenu
      account={account}
      login={connect}
      logout={reset}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage && selectedLanguage.code}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={STOSValue.toNumber()}
      links={config}
      {...props}
    />
  )
}

export default Menu
