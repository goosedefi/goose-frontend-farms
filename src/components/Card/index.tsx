import styled from 'styled-components'
import { Box } from '@pancakeswap/uikit'

const Card = styled(Box)<{
  width?: string
  padding?: string
  border?: string
  borderRadius?: string
}>`
  width: ${({ width }) => width ?? '100%'};
  border-radius: 16px;
  padding: 1.25rem;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  background-color: ${({ theme }) => theme.colors.background};
`
export default Card

export const LightCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.colors.background};
  background-color: black;
`
// ${({ theme }) => theme.colors.backgroundAlt}

export const LightGreyCard = styled(Card)`
  border: 1px solid black;
  background-color: ${({ theme }) => theme.colors.background};
`
// ${({ theme }) => theme.colors.cardBorder}

export const GreyCard = styled(Card)`
  background-color: black;
`
// ${({ theme }) => theme.colors.dropdown}