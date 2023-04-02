import { LoadingButton } from '@mui/lab'
import { Box, Card, CardContent, FormControl, FormHelperText, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormData {
  siteUrl: string
}

function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false)

  const theme = useTheme()
  const {
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onBlur'
  })

  const onSubmit = async (data: FormData) => {
    const { siteUrl } = data
    try {
      setLoading(true)
      console.log(siteUrl)
    } catch {
      setError('siteUrl', {
        type: 'manual',
        message: 'Адреса не существуеет'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(13, 7, 6.5)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={47} fill='none' height={26} viewBox='0 0 268 150' xmlns='http://www.w3.org/2000/svg'>
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
            <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
              Set up your new site.
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ mb: 1.5, fontWeight: 600, letterSpacing: '0.18px' }}>
              {`Don’t worry, you can always change this later.`}
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <TextField
                autoFocus
                label='Адрес сайта'
                error={Boolean(errors.siteUrl)}
                placeholder='site.nest-saas.io'
              />
              {errors.siteUrl && <FormHelperText sx={{ color: 'error.main' }}>{errors.siteUrl.message}</FormHelperText>}
            </FormControl>
            <LoadingButton fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }} loading={loading}>
              Продолжить
            </LoadingButton>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

export default LoginPage
