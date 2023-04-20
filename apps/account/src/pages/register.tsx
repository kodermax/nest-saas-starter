// next
import Head from 'next/head'
import NextLink from 'next/link'

// @mui
import { Link, Typography } from '@mui/material'

// components
import Iconify from '../../components/iconify'

// assets
import { PasswordIcon } from '../../assets/icons'
import RegisterForm from '../views/pages/register/RegisterForm'
import CompactLayout from '../layouts/compact'

// ----------------------------------------------------------------------

RegisterPage.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title> Reset Password | Minimal UI</title>
      </Head>

      <PasswordIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant='h3' paragraph>
        Forgot your password?
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        Please enter the email address associated with your account and We will email you a link to reset your password.
      </Typography>

      <RegisterForm />

      <NextLink href={'/login'} passHref>
        <Link
          color='inherit'
          variant='subtitle2'
          sx={{
            mt: 3,
            mx: 'auto',
            alignItems: 'center',
            display: 'inline-flex'
          }}
        >
          <Iconify icon='eva:chevron-left-fill' width={16} />
          Return to sign in
        </Link>
      </NextLink>
    </>
  )
}
