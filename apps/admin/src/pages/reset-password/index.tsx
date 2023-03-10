// ** React Imports
import { ReactNode, useEffect, useState, MouseEvent } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiCard, { CardProps } from '@mui/material/Card'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

import {
  CardContent,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material'
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustrationsV1'
import { resetPassword } from 'src/@core/services/accounts.service'
import { Controller, useForm } from 'react-hook-form'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { useRouter } from 'next/router'
import { IsString, MinLength } from 'class-validator'
import { Match } from 'src/@core/decorators/match.decorator'

// Styled Components

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 450 }
}))

class FormState {
  @IsString()
  @MinLength(5)
  newPassword: string

  @IsString()
  @MinLength(5)
  @Match('newPassword', { message: 'This password doesn’t match. Try again.' })
  confirmNewPassword: string
}

interface State {
  showNewPassword: boolean
  showConfirmNewPassword: boolean
  token: string
}

const ResetPassword = () => {
  // ** Hooks
  const theme = useTheme()
  const router = useRouter()
  const [successRequest, setSuccessRequest] = useState<boolean>(false)
  const resolver = classValidatorResolver(FormState)
  const [values, setValues] = useState<State>({
    showNewPassword: false,
    showConfirmNewPassword: false,
    token: ''
  })
  const {
    control,
    formState: { errors },
    setError,
    handleSubmit
  } = useForm<FormState>({
    mode: 'onBlur',
    resolver
  })
  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query
      setValues({ ...values, token: token as string })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const onSubmit = async (data: FormState) => {
    const { newPassword } = data
    try {
      setSuccessRequest(false)
      await resetPassword({ password: newPassword, token: values.token })
      setSuccessRequest(true)
    } catch (err: any) {
      setError('newPassword', {
        type: 'manual',
        message: err.response.data.message
      })
    }
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  const handleMouseDownNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }
  const handleMouseDownConfirmNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(15.5, 7, 8)} !important` }}>
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
              {themeConfig.templateName}
            </Typography>
          </Box>

          {successRequest && (
            <>
              <Typography variant='h5' sx={{ mb: 1.5, letterSpacing: '0.18px', fontWeight: 600 }}>
                You've successfully changed your password
              </Typography>
              <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 5.25 }} href='/'>
                Continue To Dashboard
              </Button>
            </>
          )}
          {!successRequest && (
            <>
              <Box sx={{ mb: 6 }}>
                <Typography variant='h5' sx={{ mb: 1.5, letterSpacing: '0.18px', fontWeight: 600 }}>
                  Reset Password 🔒
                </Typography>
                <Typography variant='body2'>
                  Your new password must be different from previously used passwords
                </Typography>
              </Box>
              <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <InputLabel htmlFor='auth-reset-password-new-password'>New Password</InputLabel>
                  <Controller
                    name='newPassword'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <OutlinedInput
                        autoFocus
                        value={value}
                        label='New Password'
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.newPassword)}
                        placeholder='admin@starter.com'
                        type={values.showNewPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowNewPassword}
                              aria-label='toggle password visibility'
                              onMouseDown={handleMouseDownNewPassword}
                            >
                              <Icon icon={values.showNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )}
                  />
                  {errors.newPassword && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.newPassword.message}</FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <InputLabel htmlFor='auth-reset-password-confirm-password'>Confirm Password</InputLabel>
                  <Controller
                    name='confirmNewPassword'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <OutlinedInput
                        autoFocus
                        value={value}
                        label='Confirm Password'
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.confirmNewPassword)}
                        placeholder='admin@starter.com'
                        type={values.showConfirmNewPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              aria-label='toggle password visibility'
                              onClick={handleClickShowConfirmNewPassword}
                              onMouseDown={handleMouseDownConfirmNewPassword}
                            >
                              <Icon icon={values.showConfirmNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )}
                  />
                  {errors.confirmNewPassword && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.confirmNewPassword.message}</FormHelperText>
                  )}
                </FormControl>
                <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 5.25 }}>
                  Set New Password
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography
                    component={Link}
                    href='/login'
                    sx={{
                      display: 'flex',
                      '& svg': { mr: 1.5 },
                      alignItems: 'center',
                      color: 'primary.main',
                      textDecoration: 'none',
                      justifyContent: 'center'
                    }}
                  >
                    <Icon icon='mdi:chevron-left' fontSize='2rem' />
                    <span>Back to login</span>
                  </Typography>
                </Box>
              </form>
            </>
          )}
        </CardContent>
      </Card>
      <FooterIllustrationsV1 image={`/images/pages/auth-v1-reset-password-mask-${theme.palette.mode}.png`} />
    </Box>
  )
}

ResetPassword.guestGuard = true
ResetPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ResetPassword
