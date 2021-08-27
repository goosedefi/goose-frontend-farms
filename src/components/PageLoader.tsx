import React from 'react'
import styled from 'styled-components'
import { Spinner } from '@pancakeswap-libs/uikit'
import Page from './Layout/Page'

const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const LogoLoad = styled.img`
  margin-bottom: 16px;
  opacity: 0.7
`


/* <Wrapper>
      <Spinner />
    </Wrapper> */
const PageLoader: React.FC = () => {
  return (
    <Wrapper>
      <LogoLoad src="https://quantresurgencemhy2069p5074.s3.eu-west-2.amazonaws.com/logos/QRLogo.png"/>
    </Wrapper>
  )
}

export default PageLoader
