import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { Text, Toggle } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'

const PoolTabButtons = () => {
  const { url, isExact } = useRouteMatch()
  const history = useHistory()
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <ToggleWrapper>
        <Toggle checked={!isExact} onChange={() => (!isExact ? history.push(url) : history.push(url.concat('/history')))} />
        <Text> {TranslateString(700, 'Inactive')}</Text>
      </ToggleWrapper>
    </Wrapper>
  )
}

export default PoolTabButtons

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 32px;

  ${Text} {
    margin-left: 8px;
    color: #FFFFFF;
  }
`
