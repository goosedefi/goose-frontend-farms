import React from 'react'
import styled from 'styled-components'

interface LabelProps {
  text?: string
  isFinished?: boolean
}

const Label: React.FC<LabelProps> = ({ text, isFinished = false }) => (
  <StyledLabel isFinished={isFinished}>{text}</StyledLabel>
)
// ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled' : 'primary']}
const StyledLabel = styled.div<{ isFinished: boolean }>`
  color: rgba(142, 0, 0, 1)';
  font-size: 14px;
`

export default Label
