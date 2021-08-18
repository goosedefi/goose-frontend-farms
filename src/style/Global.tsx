import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@pancakeswap-libs/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {
  }
}
// ${({ theme }) => theme.colors.background};
const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Lucida-Fax', sans-serif;
    color: black
  }
  body {
    background: radial-gradient(ellipse at center, rgb(248, 239, 225) 10%, rgb(85, 15, 30) 100%);
    padding: 4em;

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
