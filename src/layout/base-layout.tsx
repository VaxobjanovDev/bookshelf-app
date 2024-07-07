import * as React from 'react'
import Box from '@mui/material/Box'

import FlexBox from '../components/main/flexbox'
import ImageBackground from '../assets/main-background.png'
import AppHeader from '../components/main/app-header'

interface Props {
  readonly children: React.ReactNode
}

export const BaseLayout = ({ children }: Props) => {
  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: `url(${ImageBackground})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          width: '75%',
          position: 'fixed',
          top: '0',
          left: '0',
          zIndex: '-1'
        }}
      />
      <AppHeader />
      <FlexBox align="center" flex={true} justify="center" direction="column">
        {children}
      </FlexBox>
    </>
  )
}
