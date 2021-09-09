import styled from 'styled-components'

const Card = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
  background: #191919;
  box-shadow: 0px 15px 32px rgb(0 0 0 / 25%);
  border-radius: 32px;
  border: 1px solid #4d4d4d;
  display: flex;
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled' : 'secondary']};
  box-shadow: ${({ isActive }) =>
    isActive
      ? '0px 0px 0px 1px #0098A1, 0px 0px 4px 8px rgba(31, 199, 212, 0.4);'
      : '0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)'};
  flex-direction: column;
  position: relative;
`

export default Card
