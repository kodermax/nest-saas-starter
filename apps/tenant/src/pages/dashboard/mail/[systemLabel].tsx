// next
import Head from 'next/head';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// sections
import { Mail } from '../../../sections/@dashboard/mail';

// ----------------------------------------------------------------------

MailPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function MailPage() {
  return (
    <>
      <Head>
        <title> Mail | Minimal UI</title>
      </Head>

      <Mail />
    </>
  );
}
