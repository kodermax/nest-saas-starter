// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Hook
import { useSettings } from 'src/@core/hooks/useSettings'

const StyledLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  marginRight: theme.spacing(8)
}))

const BlankLayoutAppBar = () => {
  // ** Hooks & Vars
  const theme = useTheme()
  const { settings } = useSettings()
  const { skin } = settings

  return (
    <AppBar
      color='default'
      position='sticky'
      elevation={skin === 'bordered' ? 0 : 3}
      sx={{
        backgroundColor: 'background.paper',
        ...(skin === 'bordered' && { borderBottom: `1px solid ${theme.palette.divider}` })
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          p: theme => `${theme.spacing(0, 6)} !important`,
          minHeight: `${(theme.mixins.toolbar.minHeight as number) - (skin === 'bordered' ? 1 : 0)}px !important`
        }}
      >
        <StyledLink href='/'>
          <svg width={40} fill='none' height={22} viewBox='0 0 268 150' xmlns='http://www.w3.org/2000/svg'>
            <rect
              rx='25.1443'
              width='50.2886'
              height='143.953'
              fill={theme.palette.primary.main}
              transform='matrix(-0.865206 0.501417 0.498585 0.866841 195.571 0)'
            />
            <rect
              rx='25.1443'
              width='50.2886'
              height='143.953'
              fillOpacity='0.4'
              fill='url(#paint0_linear_7821_79167)'
              transform='matrix(-0.865206 0.501417 0.498585 0.866841 196.084 0)'
            />
            <rect
              rx='25.1443'
              width='50.2886'
              height='143.953'
              fill={theme.palette.primary.main}
              transform='matrix(0.865206 0.501417 -0.498585 0.866841 173.147 0)'
            />
            <rect
              rx='25.1443'
              width='50.2886'
              height='143.953'
              fill={theme.palette.primary.main}
              transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
            />
            <rect
              rx='25.1443'
              width='50.2886'
              height='143.953'
              fillOpacity='0.4'
              fill='url(#paint1_linear_7821_79167)'
              transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
            />
            <rect
              rx='25.1443'
              width='50.2886'
              height='143.953'
              fill={theme.palette.primary.main}
              transform='matrix(0.865206 0.501417 -0.498585 0.866841 71.7728 0)'
            />
            <defs>
              <linearGradient
                y1='0'
                x1='25.1443'
                x2='25.1443'
                y2='143.953'
                id='paint0_linear_7821_79167'
                gradientUnits='userSpaceOnUse'
              >
                <stop />
                <stop offset='1' stopOpacity='0' />
              </linearGradient>
              <linearGradient
                y1='0'
                x1='25.1443'
                x2='25.1443'
                y2='143.953'
                id='paint1_linear_7821_79167'
                gradientUnits='userSpaceOnUse'
              >
                <stop />
                <stop offset='1' stopOpacity='0' />
              </linearGradient>
            </defs>
          </svg>
          <Typography variant='h6' sx={{ ml: 2, fontWeight: 700, lineHeight: 1.2 }}>
            {themeConfig.templateName}
          </Typography>
        </StyledLink>
      </Toolbar>
    </AppBar>
  )
}

export default BlankLayoutAppBar
