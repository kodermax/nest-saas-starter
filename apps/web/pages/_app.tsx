import { AppBar, Box, Button, Container, CssBaseline, Toolbar, Typography } from '@mui/material'
import type { AppProps } from 'next/app'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <AppBar position='static' sx={{ background: 'white' }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none'
            }}
          >
            NumeraZone
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>&nbsp;</Box>
          <Box sx={{ flexGrow: 0 }}>
            <Button href={`${process.env.NEXT_PUBLIC_ACCOUNT_URL}/signup`}>Регистрация</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    {children}
  </>
)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
