import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import {
  Box,
  Card,
  Link,
  Stack,
  Avatar,
  MenuItem,
  IconButton,
  Typography,
  InputAdornment,
} from '@mui/material';
// @types
import { IUserProfileFriend } from '../../../../@types/user';
// _mock
import { _socials } from '../../../../_mock/arrays';
// components
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import { CustomTextField } from '../../../../components/custom-input';
import SearchNotFound from '../../../../components/search-not-found';

// ----------------------------------------------------------------------

type Props = {
  friends: IUserProfileFriend[];
  searchFriends: string;
  onSearchFriends: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ProfileFriends({ friends, searchFriends, onSearchFriends }: Props) {
  const dataFiltered = applyFilter(friends, searchFriends);

  const isNotFound = !dataFiltered.length && !!searchFriends;

  return (
    <>
      <Stack
        spacing={3}
        justifyContent="space-between"
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ my: 5 }}
      >
        <Typography variant="h4">Friends</Typography>

        <CustomTextField
          width={220}
          size="small"
          value={searchFriends}
          onChange={onSearchFriends}
          placeholder="Search friends..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {isNotFound ? (
        <SearchNotFound query={searchFriends} sx={{ mt: 10 }} />
      ) : (
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          {dataFiltered.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </Box>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

type FriendCardProps = {
  friend: IUserProfileFriend;
};

function FriendCard({ friend }: FriendCardProps) {
  const { name, role, avatarUrl } = friend;

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleDelete = () => {
    handleClosePopover();
    console.log('DELETE', name);
  };

  const handleEdit = () => {
    handleClosePopover();
    console.log('EDIT', name);
  };

  return (
    <>
      <Card
        sx={{
          py: 5,
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Avatar alt={name} src={avatarUrl} sx={{ width: 64, height: 64, mb: 3 }} />

        <Link variant="subtitle1" color="text.primary">
          {name}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, mt: 0.5 }}>
          {role}
        </Typography>

        <Stack alignItems="center" justifyContent="center" direction="row">
          {_socials.map((social) => (
            <IconButton
              key={social.name}
              sx={{
                color: social.color,
                '&:hover': {
                  bgcolor: alpha(social.color, 0.08),
                },
              }}
            >
              <Iconify icon={social.icon} />
            </IconButton>
          ))}
        </Stack>

        <IconButton
          color={openPopover ? 'inherit' : 'default'}
          onClick={handleOpenPopover}
          sx={{ top: 8, right: 8, position: 'absolute' }}
        >
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Card>

      <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="right-top">
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter(inputData: IUserProfileFriend[], query: string) {
  if (query) {
    return inputData.filter(
      (friend) => friend.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return inputData;
}
