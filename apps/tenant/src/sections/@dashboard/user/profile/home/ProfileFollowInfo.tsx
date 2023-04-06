// @mui
import { Card, Stack, Typography, Divider } from '@mui/material';
// utils
import { fNumber } from '../../../../../utils/formatNumber';
// @types
import { IUserProfileFollowers } from '../../../../../@types/user';

// ----------------------------------------------------------------------

export default function ProfileFollowInfo({ follower, following }: IUserProfileFollowers) {
  return (
    <Card sx={{ py: 3 }}>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(follower)}</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Follower
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(following)}</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Following
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
