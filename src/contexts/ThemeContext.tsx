import React, { useState } from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { light as lightOrigin, dark as darkOrigin, PancakeTheme } from '@pancakeswap-libs/uikit'

// customize dark theme
const dark: PancakeTheme = darkOrigin;
dark.toggle.handleBackground = 'white';
dark.colors.input = '#292933';
dark.colors.success = '#cdcdcd';
dark.card.background = '#27262c';
dark.colors.text = 'white';

// customize light theme
const light: PancakeTheme = lightOrigin;
light.toggle.handleBackground = 'white';
light.colors.input = '#292933';
light.colors.success = '#cdcdcd';
light.card.background = '#27262c';
light.colors.text = 'white';

const CACHE_KEY = 'IS_DARK'

const ThemeContext = React.createContext({ isDark: null, toggleTheme: () => null })

const ThemeContextProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const isDarkUserSetting = localStorage.getItem(CACHE_KEY)
    return isDarkUserSetting ? JSON.parse(isDarkUserSetting) : false
  })



  const toggleTheme = () => {
    setIsDark((prevState) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(!prevState))
      return !prevState
    })
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SCThemeProvider theme={isDark ? dark : light}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
