// @mui
import { Chip, Avatar, Checkbox, Stack, FormControlLabel } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// @types
import { IBlogPost } from '../../../@types/blog';
// components
import Iconify from '../../../components/iconify';
import { CustomAvatarGroup } from '../../../components/custom-avatar';

// ----------------------------------------------------------------------

type Props = {
  post: IBlogPost;
};

export default function BlogPostTags({ post }: Props) {
  const { favorite, tags, favoritePerson } = post;

  return (
    <>
      <Stack direction="row" flexWrap="wrap">
        {tags.map((tag) => (
          <Chip key={tag} label={tag} sx={{ m: 0.5 }} />
        ))}
      </Stack>

      <Stack direction="row" alignItems="center">
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              size="small"
              color="error"
              icon={<Iconify icon="eva:heart-fill" />}
              checkedIcon={<Iconify icon="eva:heart-fill" />}
            />
          }
          label={fShortenNumber(favorite)}
        />

        <CustomAvatarGroup>
          {favoritePerson.map((person) => (
            <Avatar key={person.name} alt={person.name} src={person.avatarUrl} />
          ))}
        </CustomAvatarGroup>
      </Stack>
    </>
  );
}
