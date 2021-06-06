import React from 'react'
import styled from 'styled-components'
import { Heading, LogoIcon, Text, Button } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import { useHistory } from 'react-router-dom'
import HowItWorks from './components/HowItWorks'
import NftList from './components/NftList'
import NftTable from './components/NftTable'
import NftProvider from './contexts/NftProvider'
import NftInfo from './components/NftInfo'

const StyledHero = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 24px;
  padding-bottom: 32px;
`

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

const CustomButton = styled(Button)`
  margin-right: 20px;
`

const GoldenButton = styled(Button)`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(110, 80, 20, 0.4), inset 0 -2px 5px 1px rgba(139, 66, 8, 1),
    inset 0 -1px 1px 3px rgba(250, 227, 133, 1);
  background-image: linear-gradient(160deg, #a54e07, #b47e11, #fef1a2, #bc881b, #a54e07);
  border: 1px solid #a55d07;
  color: rgb(120, 50, 5);
  text-shadow: 0 2px 2px rgba(250, 227, 133, 1);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-size: 100% 100%;
  background-position: center;

  &:focus,
  &:hover {
    background-size: 150% 150%;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23), inset 0 -2px 5px 1px #b17d10,
      inset 0 -1px 1px 3px rgba(250, 227, 133, 1);
    border: 1px solid rgba(165, 93, 7, 0.6);
    color: rgba(120, 50, 5, 0.8);
  }
  &:active {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(110, 80, 20, 0.4), inset 0 -2px 5px 1px #b17d10,
      inset 0 -1px 1px 3px rgba(250, 227, 133, 1);
  }
`

const Nft = () => {
  const TranslateString = useI18n()
  const { account } = useWallet()
  const history = useHistory()

  if (account) {
    return (
      <NftProvider>
        <Page>
          <StyledHero>
            <Heading as="h1" size="xl" color="#9f0d0d" mb="24px">
              My NFT Collections
            </Heading>
            <CustomButton mt="24px">Genesis Collections</CustomButton>
          </StyledHero>
          <NftInfo />
          <NftTable />
        </Page>
      </NftProvider>
    )
  }

  return (
    <Page>
      <StyledNotFound>
        <LogoIcon width="64px" mb="8px" />
        <Text mb="16px">{TranslateString(999, 'Empty Collection')}</Text>
      </StyledNotFound>
    </Page>
  )
}

export default Nft
