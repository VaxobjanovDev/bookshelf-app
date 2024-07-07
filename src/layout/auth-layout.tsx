import * as React from 'react'
import ImageBackground from 'assets/main-background.png'
import Box from '@mui/material/Box'

import FlexBox from '../components/main/flexbox'

interface Props {
  readonly children: React.ReactNode
}

export const AuthLayout = ({ children }: Props) => {
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
      <FlexBox
        align="center"
        flex={true}
        justify="center"
        sx={{ height: '100vh' }}
      >
        {children}
      </FlexBox>
    </>
  )
}
