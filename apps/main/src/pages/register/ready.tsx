// next
import Head from 'next/head'
import NextLink from 'next/link'

// @mui
import { Button, Typography, Stack } from '@mui/material'

// layouts

// assets
import CompactLayout from 'src/layouts/compact'
import { useEffect, useState } from 'react'
import { getCurrentTenant } from 'src/@core/services/tenants.service'
import { MaintenanceIllustration } from 'src/assets/illustrations'

// ----------------------------------------------------------------------

ReadyPage.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>

// ----------------------------------------------------------------------

export default function ReadyPage() {
  const [siteUrl, setSiteUrl] = useState<string>('')

  useEffect(() => {
    async function request() {
      const {
        data: { siteUrl }
      } = await getCurrentTenant()
      setSiteUrl(siteUrl)
    }
    request()
  }, [])

  return (
    <>
      <Head>
        <title> Maintenance | Minimal UI</title>
      </Head>

      <Stack sx={{ alignItems: 'center' }}>
        <Typography variant='h3' paragraph>
          Ваш сайт готов!
        </Typography>

        <MaintenanceIllustration sx={{ my: 10, height: 240 }} />

        <NextLink href={siteUrl} passHref>
          <Button size='large' variant='contained'>
            Открыть сайт
          </Button>
        </NextLink>
      </Stack>
    </>
  )
}
