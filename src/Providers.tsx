import React from 'react'
import { ModalProvider } from '@pancakeswap-libs/uikit'
// import bsc, { UseWalletProvider } from '@binance-chain/bsc-use-wallet'
import * as bsc from '@binance-chain/bsc-use-wallet'
import { Provider } from 'react-redux'
import getRpcUrl from 'utils/getRpcUrl'
import { LanguageContextProvider } from 'contexts/Localisation/languageContext'
import { ThemeContextProvider } from 'contexts/ThemeContext'
import { BlockContextProvider } from 'contexts/BlockContext'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import store from 'state'
import { ToastsProvider } from 'contexts/ToastsContext'


const Providers: React.FC = ({ children }) => {
  const rpcUrl = getRpcUrl()
  const chainId = parseInt(process.env.REACT_APP_CHAIN_ID);
  return (
    <Provider store={store}>
      <ThemeContextProvider>
       {// <LanguageContextProvider>
       }
       <ToastsProvider>
          <bsc.UseWalletProvider
            chainId={chainId}
            connectors={{
              walletconnect: { rpcUrl },
              bsc,
            }}
          >
           <BlockContextProvider>
              <RefreshContextProvider>
              <ModalProvider>{children}</ModalProvider> 
              </RefreshContextProvider> 
           </BlockContextProvider> 
          </bsc.UseWalletProvider>
          </ToastsProvider>
       {// </LanguageContextProvider>
       }
      </ThemeContextProvider>
    </Provider>
  )
}

export default Providers
