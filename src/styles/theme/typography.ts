import { PaletteMode } from '@mui/material'
import { TypographyOptions } from '@mui/material/styles/createTypography'

interface Props {
  sm: number
  md: number
  lg: number
}

export function remToPx (value: string) {
  return Math.round(parseFloat(value) * 16)
}

export function pxToRem (value: number) {
  return `${value / 16}rem`
}

export function responsiveFontSizes ({ sm, md, lg }: Props) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm)
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md)
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg)
    }
  }
}

export const primaryFont = 'Mulish, sans-serif'
export const secondaryFont = 'Mulish, sans-serif'

export const typography = (palette: PaletteMode): TypographyOptions => {
  return {
    fontFamily: primaryFont,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontWeight: 700,
      lineHeight: 80 / 64,
      fontSize: pxToRem(40),
      ...responsiveFontSizes({ sm: 48, md: 54, lg: 60 })
    },
    h2: {
      fontWeight: 700,
      lineHeight: 64 / 48,
      fontSize: pxToRem(32),
      ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 })
    },
    h3: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(24),
      ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 })
    },
    h4: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(20),
      ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 })
    },
    h5: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(18),
      ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 })
    },
    h6: {
      fontWeight: 700,
      lineHeight: 28 / 18,
      fontSize: pxToRem(16),
      ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 })
    },
    subtitle1: {
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: pxToRem(16)
    },
    subtitle2: {
      fontWeight: 600,
      lineHeight: 22 / 14,
      fontSize: pxToRem(14)
    },
    body1: {
      lineHeight: 1.5,
      fontSize: pxToRem(17),
      fontFamily: secondaryFont
    },
    body2: {
      lineHeight: 22 / 14,
      fontSize: pxToRem(14),
      fontFamily: secondaryFont
    },
    caption: {
      lineHeight: 1.5,
      fontSize: pxToRem(12)
    },
    overline: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(12),
      textTransform: 'uppercase'
    },
    button: {
      fontWeight: 600,
      lineHeight: 24 / 14,
      fontSize: pxToRem(14),
      textTransform: 'unset'
    }
  }
}
