import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Logo from 'assets/logo.png'
import { useSearchContext } from 'context/search'
import { useGetDetail } from 'hooks/useGetDetail'
import { prop } from 'ramda'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AvatarImage from 'assets/avatar.jpg'

import FlexBox from './flexbox'

import { getUserDetail } from '../../modules/home/api/api'
import SearchField from '../form/searchfield'
import { BellIcon } from '../../icons/bell-icon'

function AppHeader () {
  const getUser = useGetDetail(getUserDetail)
  const { setSearchValue } = useSearchContext()
  const response = prop('result', getUser)
  const data = prop('data', response)
  const email = prop('email', data)
  const name = prop('name', data)
  const navRef = useRef<HTMLDivElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleSearch = (values: any) => {
    setSearchValue(values)
  }

  const handleLogOut = () => {
    const bookToken = localStorage.getItem('book-token')
    if (bookToken) {
      localStorage.setItem('book-token', '')
      location.reload()
    }
    handleCloseUserMenu()
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <FlexBox
      ref={navRef}
      sx={{
        width: '100%',
        maxWidth: '100%',
        position: 'fixed',
        top: '0',
        left: '0',
        display: 'flex',
        alignItems: 'center',
        height: '72px',
        backgroundColor: isScrolled ? '#333333' : 'transparent',
        transition: 'background-color 0.3s ease',
        zIndex: '999'
      }}>
      <Container maxWidth="xl">
        <FlexBox flex justify="space-between">
          <FlexBox spacing={2}>
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
            <SearchField
              name="title"
              initialValues={{}}
              onSubmit={handleSearch}
              placeholder="Search for any training you want "
            />
          </FlexBox>
          <FlexBox spacing={2}>
            <IconButton>
              <BellIcon />
            </IconButton>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: '2px',
                    border: '2px solid transparent',
                    backgroundImage: 'linear-gradient(to right, #FD648E, #884CB2)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                    width: '100%',
                    height: '100%'
                  }}>
                  <Avatar alt="Avatar" src={AvatarImage} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px', width: '100%' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                <MenuItem>
                  <Typography textAlign="center">{name}</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center">{email}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogOut}>
                  <Typography textAlign="center">Log out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </FlexBox>
        </FlexBox>
      </Container>
    </FlexBox>
  )
}

export default AppHeader
