// next
import Head from 'next/head'
import NextLink from 'next/link'

// @mui
import { Link, Typography } from '@mui/material'

import Iconify from 'src/components/iconify'
import { PlanPremiumIcon } from 'src/assets/icons'
import CompactLayout from 'src/layouts/compact'
import RegisterTenantForm from 'src/views/pages/register/RegisterTenantForm'

// ----------------------------------------------------------------------

RegisterTenantPage.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>

// ----------------------------------------------------------------------

export default function RegisterTenantPage() {
  return (
    <>
      <Head>
        <title> Регистрация</title>
      </Head>

      <PlanPremiumIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant='h3' paragraph>
        Nest SaaS
      </Typography>
      <RegisterTenantForm />

      <NextLink href={'/login'} passHref legacyBehavior>
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
          Войти
        </Link>
      </NextLink>
    </>
  )
}
