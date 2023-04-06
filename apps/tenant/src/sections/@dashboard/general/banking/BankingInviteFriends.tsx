// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Stack, Typography, Button, BoxProps, InputBase } from '@mui/material';
// components
import Image from '../../../../components/image';
// utils
import { bgGradient } from '../../../../utils/cssStyles';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  img?: string;
  title?: string;
  price?: string;
  description?: string;
}

export default function BankingInviteFriends({
  img,
  price,
  title,
  description,
  sx,
  ...other
}: Props) {
  const theme = useTheme();

  return (
    <Box {...other}>
      <Image
        disabledEffect
        alt="illustration-invite"
        src={img}
        sx={{
          left: 40,
          zIndex: 9,
          width: 140,
          position: 'relative',
          filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.24))',
          ...sx,
        }}
      />

      <Box
        sx={{
          mt: -15,
          color: 'common.white',
          borderRadius: 2,
          p: (theme) => theme.spacing(16, 5, 5, 5),
          ...bgGradient({
            direction: '135deg',
            startColor: theme.palette.primary.main,
            endColor: theme.palette.primary.dark,
          }),
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" sx={{ whiteSpace: 'pre-line' }}>
            {title}
          </Typography>

          <Typography variant="h2"> {price} </Typography>
        </Stack>

        <Typography variant="body2" sx={{ mt: 2, mb: 3 }}>
          {description}
        </Typography>

        <Stack direction="row" spacing={1}>
          <InputBase
            fullWidth
            placeholder="Email"
            sx={{
              px: 1.5,
              height: 40,
              borderRadius: 1,
              color: 'common.white',
              bgcolor: (theme) => alpha(theme.palette.common.black, 0.16),
              '&::placeholder': {
                color: (theme) => alpha(theme.palette.common.white, 0.48),
              },
            }}
          />

          <Button color="warning" variant="contained">
            Invite
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
