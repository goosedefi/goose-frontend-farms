import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Card, CardBody } from '@pancakeswap-libs/uikit'

const StyledLotteryCard = styled(Card)`
  background-position: top right;
  min-height: 376px;
  background: transparent;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  display: flex;
  margin-top: 24px;
  button {
    flex: 1 0 50%;
  }
`

const LogoCard = () => {
  return (
    <StyledLotteryCard>
      <CardBody>
        <CardImage src="/images/euphoria-transparent.png" alt="euphoria logo" />
      </CardBody>
    </StyledLotteryCard>
  )
}

export default LogoCard
