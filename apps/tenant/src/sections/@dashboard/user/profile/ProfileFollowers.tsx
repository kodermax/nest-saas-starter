import { useState } from 'react';
// @mui
import { Box, Card, Button, Avatar, Typography, Stack } from '@mui/material';
// @types
import { IUserProfileFollower } from '../../../../@types/user';
// components
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

type Props = {
  followers: IUserProfileFollower[];
};

export default function ProfileFollowers({ followers }: Props) {
  return (
    <>
      <Typography variant="h4" sx={{ my: 5 }}>
        Followers
      </Typography>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {followers.map((follower) => (
          <FollowerCard key={follower.id} follower={follower} />
        ))}
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------

type FollowerCardProps = {
  follower: IUserProfileFollower;
};

function FollowerCard({ follower }: FollowerCardProps) {
  const { name, country, avatarUrl, isFollowed } = follower;

  const [toggle, setToogle] = useState(isFollowed);

  return (
    <Card
      sx={{
        p: 3,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />

      <Box
        sx={{
          pl: 2,
          pr: 1,
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>

        <Stack spacing={0.5} direction="row" alignItems="center" sx={{ color: 'text.secondary' }}>
          <Iconify icon="eva:pin-fill" width={16} sx={{ flexShrink: 0 }} />

          <Typography variant="body2" component="span" noWrap>
            {country}
          </Typography>
        </Stack>
      </Box>

      <Button
        size="small"
        onClick={() => setToogle(!toggle)}
        variant={toggle ? 'text' : 'outlined'}
        color={toggle ? 'primary' : 'inherit'}
        startIcon={toggle && <Iconify icon="eva:checkmark-fill" />}
        sx={{ flexShrink: 0 }}
      >
        {toggle ? 'Followed' : 'Follow'}
      </Button>
    </Card>
  );
}
