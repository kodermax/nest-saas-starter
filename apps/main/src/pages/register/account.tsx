// next
import Head from 'next/head'
import NextLink from 'next/link'

// @mui
import { Link, Typography } from '@mui/material'

import Iconify from 'src/components/iconify'
import CompactLayout from 'src/layouts/compact'
import RegisterAccountForm from 'src/views/pages/register/RegisterAccountForm'
import { PlanPremiumIcon } from 'src/assets/icons'

// ----------------------------------------------------------------------

RegisterAccountPage.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>

// ----------------------------------------------------------------------

export default function RegisterAccountPage() {
  return (
    <>
      <Head>
        <title>Регистрация</title>
      </Head>

      <PlanPremiumIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant='h3' paragraph>
        Создать аккаунт
      </Typography>
      <RegisterAccountForm />

      <NextLink href={'/register'} passHref legacyBehavior>
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
          Назад
        </Link>
      </NextLink>
    </>
  )
}
