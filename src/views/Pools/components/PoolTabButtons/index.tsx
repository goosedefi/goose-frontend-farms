import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'

const ButtonMenuBison = styled(ButtonMenu)`
  background: rgba(218, 161, 14, 0.25) !important;
  border: none;
`


const PoolTabButtons = () => {
  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <ButtonMenuBison
        activeIndex={!isExact ? 1 : 0} size="sm" variant="subtle">
        <ButtonMenuItem
          as={Link}
          to={`${url}`}
          style={{
            background: !isExact ? 'transparent' : '#DAA10E',
            color: !isExact ? '#FFFFFF' : '#191919',
          }}
        >
          {TranslateString(999, 'Active')}
        </ButtonMenuItem>
        <ButtonMenuItem
          as={Link}
          to="/history"
          style={{
            background: isExact ? 'transparent' : '#DAA10E',
            color: isExact ? '#FFFFFF' : '#191919',
          }}
        >
          {TranslateString(999, 'Inactive')}
        </ButtonMenuItem>
      </ButtonMenuBison>
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
