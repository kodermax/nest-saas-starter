// next
import Head from 'next/head';
import NextLink from 'next/link';
// @mui
import { Link, Typography } from '@mui/material';
// layouts
import CompactLayout from '../../layouts/compact';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
// sections
import AuthVerifyCodeForm from '../../sections/auth/AuthVerifyCodeForm';
// assets
import { EmailInboxIcon } from '../../assets/icons';

// ----------------------------------------------------------------------

VerifyCodePage.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function VerifyCodePage() {
  return (
    <>
      <Head>
        <title> Verify Code | Minimal UI</title>
      </Head>

      <EmailInboxIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" paragraph>
        Please check your email!
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        We have emailed a 6-digit confirmation code to acb@domain, please enter the code in below
        box to verify your email.
      </Typography>

      <AuthVerifyCodeForm />

      <Typography variant="body2" sx={{ my: 3 }}>
        Don’t have a code? &nbsp;
        <Link variant="subtitle2">Resend code</Link>
      </Typography>

      <NextLink href={PATH_AUTH.login} passHref>
        <Link
          color="inherit"
          variant="subtitle2"
          sx={{
            mx: 'auto',
            alignItems: 'center',
            display: 'inline-flex',
          }}
        >
          <Iconify icon="eva:chevron-left-fill" width={16} />
          Return to sign in
        </Link>
      </NextLink>
    </>
  );
}
