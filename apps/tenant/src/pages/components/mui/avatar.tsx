// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Container, Tooltip } from '@mui/material';
import { Masonry } from '@mui/lab';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import MainLayout from '../../../layouts/main';
// _mock
import _mock from '../../../_mock';
// components
import Iconify from '../../../components/iconify';
import BadgeStatus from '../../../components/badge-status';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { CustomAvatar, CustomAvatarGroup } from '../../../components/custom-avatar';
// sections
import { Block } from '../../../sections/_examples/Block';

// ----------------------------------------------------------------------

const COLORS = ['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

const SIZES = ['tiny', 'small', 'medium', 'large'] as const;

const VARIANTS = ['circular', 'rounded', 'square'] as const;

const STATUS = ['online', 'away', 'busy', 'invisible'];

// ----------------------------------------------------------------------

MUIAvatarPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function MUIAvatarPage() {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title> MUI Components: Avatar | Minimal UI</title>
      </Head>

      <Box
        sx={{
          pt: 6,
          pb: 1,
          bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'),
        }}
      >
        <Container>
          <CustomBreadcrumbs
            heading="Avatar"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Avatar' },
            ]}
            moreLink={['https://mui.com/components/avatars']}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
          <Block
            title="Image avatars"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& > *': { mx: 1 },
            }}
          >
            {[1, 2, 3, 4, 5].map((_, index) => (
              <CustomAvatar key={index} alt="Remy Sharp" src={_mock.image.avatar(index + 1)} />
            ))}
          </Block>

          <Block
            title="Letter avatars"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& > *': { mx: 1 },
            }}
          >
            {COLORS.map((color, index) => (
              <Tooltip key={color} title={color}>
                <CustomAvatar name={_mock.name.fullName(index)} />
              </Tooltip>
            ))}
          </Block>

          <Block
            title="Icon avatars"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& > *': { mx: 1 },
            }}
          >
            {COLORS.map((color) => (
              <CustomAvatar key={color} color={color}>
                <Iconify icon="eva:folder-add-outline" width={24} />
              </CustomAvatar>
            ))}
          </Block>

          <Block
            title="Variant"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& > *': { mx: 1 },
            }}
          >
            {VARIANTS.map((variant) => (
              <CustomAvatar key={variant} variant={variant} color="primary">
                <Iconify icon="eva:folder-add-outline" width={24} />
              </CustomAvatar>
            ))}
          </Block>

          <Block
            title="Grouped"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {SIZES.map((size) => (
              <Tooltip key={size} title={size}>
                <CustomAvatarGroup key={size} size={size}>
                  {COLORS.map((color, index) => (
                    <CustomAvatar
                      key={color}
                      alt="Remy Sharp"
                      src={_mock.image.avatar(index + 1)}
                    />
                  ))}
                </CustomAvatarGroup>
              </Tooltip>
            ))}

            <Tooltip title="compact">
              <CustomAvatarGroup compact sx={{ width: 48, height: 48 }}>
                {COLORS.slice(0, 2).map((color, index) => (
                  <CustomAvatar key={color} alt="Remy Sharp" src={_mock.image.avatar(index + 1)} />
                ))}
              </CustomAvatarGroup>
            </Tooltip>
          </Block>

          <Block
            title="With badge"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& > *': { mx: 1 },
            }}
          >
            <CustomAvatar
              alt="Travis Howard"
              src={_mock.image.avatar(1)}
              BadgeProps={{
                badgeContent: (
                  <CustomAvatar
                    alt="Travis Howard"
                    src={_mock.image.avatar(7)}
                    sx={{
                      width: 24,
                      height: 24,
                      border: `solid 2px ${theme.palette.background.paper}`,
                    }}
                  />
                ),
              }}
            />

            {STATUS.map((status, index) => (
              <CustomAvatar
                key={status}
                alt="Travis Howard"
                src={_mock.image.avatar(index + 1)}
                BadgeProps={{
                  badgeContent: <BadgeStatus status={status} size="large" />,
                }}
              />
            ))}
          </Block>

          <Block
            title="Sizes"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& > *': { mx: 1 },
            }}
          >
            {[24, 32, 48, 56, 64, 80, 128].map((size, index) => (
              <CustomAvatar
                key={size}
                alt="Travis Howard"
                src={_mock.image.avatar(index + 4)}
                sx={{ width: size, height: size }}
              />
            ))}
          </Block>
        </Masonry>
      </Container>
    </>
  );
}
