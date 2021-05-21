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

let STOSValue = ZERO;
fetch('https://api.vlad.finance/price.php?key=6547643&pool=0x60d5e86c0074b56e52a7540b3bf36c399e9f3038&token=0x279d41f3f78fe5c1f0ba41ae963d6e545113c973&decimals=8')
  .then((res) => res.json())
  .then(
    (result) => {
      if (result.status === true) {
        console.log("test", result.data);
        STOSValue = new BigNumber(result.data)
      } else {
        STOSValue = ZERO
      }
    },
    (error) => {
      STOSValue = ZERO
    },
  ).catch(() => {
    STOSValue = ZERO
  }
  );

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
