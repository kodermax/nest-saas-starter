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
import AuthNewPasswordForm from '../../sections/auth/AuthNewPasswordForm';
// assets
import { SentIcon } from '../../assets/icons';

// ----------------------------------------------------------------------

NewPasswordPage.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function NewPasswordPage() {
  return (
    <>
      <Head>
        <title> New Password | Minimal UI</title>
      </Head>

      <SentIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" paragraph>
        Request sent successfully!
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        We've sent a 6-digit confirmation email to your email.
        <br />
        Please enter the code in below box to verify your email.
      </Typography>

      <AuthNewPasswordForm />

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
