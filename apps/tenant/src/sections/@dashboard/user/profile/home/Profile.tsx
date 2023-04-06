// @mui
import { Grid, Stack } from '@mui/material';
// @types
import { IUserProfile, IUserProfilePost } from '../../../../../@types/user';
//
import ProfileAbout from './ProfileAbout';
import ProfilePostCard from './ProfilePostCard';
import ProfilePostInput from './ProfilePostInput';
import ProfileFollowInfo from './ProfileFollowInfo';
import ProfileSocialInfo from './ProfileSocialInfo';

// ----------------------------------------------------------------------

type Props = {
  info: IUserProfile;
  posts: IUserProfilePost[];
};

export default function Profile({ info, posts }: Props) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileFollowInfo follower={info.follower} following={info.following} />

          <ProfileAbout
            quote={info.quote}
            country={info.country}
            email={info.email}
            role={info.role}
            company={info.company}
            school={info.school}
          />

          <ProfileSocialInfo socialLinks={info.socialLinks} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <ProfilePostInput />

          {posts.map((post) => (
            <ProfilePostCard key={post.id} post={post} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
