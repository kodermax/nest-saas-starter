// next
import Head from 'next/head'
import NextLink from 'next/link'

// @mui
import { Link, Typography } from '@mui/material'

// layouts
import CompactLayout from '../../layouts/compact'

// routes
import { PATH_AUTH } from '../../routes/paths'

// components
import Iconify from '../../components/iconify'

// assets
import { EmailInboxIcon } from '../../assets/icons'
import RegisterVerifyCodeForm from '../../views/pages/register/RegisterVerifyCodeForm'

// ----------------------------------------------------------------------

VerifyCodePage.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>

// ----------------------------------------------------------------------

export default function VerifyCodePage() {
  return (
    <>
      <Head>
        <title> Verify Code | Minimal UI</title>
      </Head>

      <EmailInboxIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant='h3' paragraph>
        Поздравляем!
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        Ваш личный сайт 09080808.space.space создан! Для продолжения работы введите код из acb@domain email.
      </Typography>

      <RegisterVerifyCodeForm />

      <Typography variant='body2' sx={{ my: 3 }}>
        Не получили код? &nbsp;
        <Link variant='subtitle2'>Отправить повторно</Link>
      </Typography>

      <NextLink href={PATH_AUTH.login} passHref legacyBehavior>
        <Link
          color='inherit'
          variant='subtitle2'
          sx={{
            mx: 'auto',
            alignItems: 'center',
            display: 'inline-flex'
          }}
        >
          <Iconify icon='eva:chevron-left-fill' width={16} />
          Вернутся ко входу
        </Link>
      </NextLink>
    </>
  )
}
