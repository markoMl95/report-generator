import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    lightBlue?: Palette['primary']
    highlightedBlue?: Palette['primary']
    yellow?: Palette['primary']
    darkGrey?: Palette['primary']
    mediumGrey?: Palette['primary']
    lightGrey?: Palette['primary']
    ultraLightGrey?: Palette['primary']
    fontColor?: Palette['primary']
    dark?: Palette['primary']
    white?: Palette['primary']
    lightYellow?: Palette['primary']
  }

  interface PaletteOptions {
    lightBlue?: PaletteOptions['primary']
    highlightedBlue?: PaletteOptions['primary']
    yellow?: PaletteOptions['primary']
    darkGrey?: PaletteOptions['primary']
    mediumGrey?: PaletteOptions['primary']
    lightGrey?: PaletteOptions['primary']
    ultraLightGrey?: PaletteOptions['primary']
    fontColor?: PaletteOptions['primary']
    dark?: PaletteOptions['primary']
    white?: PaletteOptions['primary']
    lightYellow?: PaletteOptions['primary']
  }
}

const theme = createTheme({
  palette: {
    primary: { main: '#003755' },
    lightBlue: { main: '#00B9E4' },
    highlightedBlue: { main: '#E8F0F5' },
    yellow: { main: '#FECB00' },
    error: { main: '#B9002D' },
    warning: { main: '#FB8B00' },
    darkGrey: { main: '#565A5C' },
    mediumGrey: { main: '#8E908F' },
    lightGrey: { main: '#E0E1DD' },
    ultraLightGrey: { main: '#C4C4C4' },
    background: { default: '#FAFAFA' },
    fontColor: { main: '#3c3c3c' },
    dark: { main: '#1C1E29' },
    white: { main: '#FFFFFF' },
    lightYellow: { main: '#FEDA62' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
})

export default theme
