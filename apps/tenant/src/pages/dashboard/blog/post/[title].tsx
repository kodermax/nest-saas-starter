import { useEffect, useState, useCallback } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Box, Divider, Stack, Container, Typography, Pagination } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import axios from '../../../../utils/axios';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// @types
import { IBlogPost } from '../../../../@types/blog';
// components
import Markdown from '../../../../components/markdown';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../components/settings';
import { SkeletonPostDetails } from '../../../../components/skeleton';
// sections
import {
  BlogPostHero,
  BlogPostTags,
  BlogPostCard,
  BlogPostCommentList,
  BlogPostCommentForm,
} from '../../../../sections/@dashboard/blog';

// ----------------------------------------------------------------------

BlogPostPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function BlogPostPage() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { title },
  } = useRouter();

  const [recentPosts, setRecentPosts] = useState<IBlogPost[]>([]);

  const [post, setPost] = useState<IBlogPost | null>(null);

  const [loadingPost, setLoadingPost] = useState(true);

  const [error, setError] = useState(null);

  const getPost = useCallback(async () => {
    try {
      const response = await axios.get('/api/blog/post', {
        params: { title },
      });

      setPost(response.data.post);
      setLoadingPost(false);
    } catch (error) {
      console.error(error);
      setLoadingPost(false);
      setError(error.message);
    }
  }, [title]);

  const getRecentPosts = useCallback(async () => {
    try {
      const response = await axios.get('/api/blog/posts/recent', {
        params: { title },
      });

      setRecentPosts(response.data.recentPosts);
    } catch (error) {
      console.error(error);
    }
  }, [title]);

  useEffect(() => {
    getRecentPosts();
  }, [getRecentPosts]);

  useEffect(() => {
    if (title) {
      getPost();
    }
  }, [getPost, title]);

  return (
    <>
      <Head>
        <title>{`Blog: ${post?.title || ''} | Minimal UI`}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Post Details"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Blog',
              href: PATH_DASHBOARD.blog.root,
            },
            {
              name: post?.title,
            },
          ]}
        />

        {post && (
          <Stack
            sx={{
              borderRadius: 2,
              boxShadow: (theme) => ({
                md: theme.customShadows.card,
              }),
            }}
          >
            <BlogPostHero post={post} />

            <Typography
              variant="h6"
              sx={{
                py: 5,
                px: { md: 5 },
              }}
            >
              {post.description}
            </Typography>

            <Markdown
              children={post.body}
              sx={{
                px: { md: 5 },
              }}
            />

            <Stack
              spacing={3}
              sx={{
                py: 5,
                px: { md: 5 },
              }}
            >
              <Divider />
              <BlogPostTags post={post} />
              <Divider />
            </Stack>

            <Stack
              sx={{
                px: { md: 5 },
              }}
            >
              <Stack direction="row" sx={{ mb: 3 }}>
                <Typography variant="h4">Comments</Typography>

                <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                  ({post.comments.length})
                </Typography>
              </Stack>

              <BlogPostCommentForm />

              <Divider sx={{ mt: 5, mb: 2 }} />
            </Stack>

            <Stack
              sx={{
                px: { md: 5 },
              }}
            >
              <BlogPostCommentList comments={post.comments} />

              <Pagination
                count={8}
                sx={{
                  my: 5,
                  ml: 'auto',
                  mr: { xs: 'auto', md: 0 },
                }}
              />
            </Stack>
          </Stack>
        )}

        {error && !loadingPost && <Typography variant="h6">404 {error}</Typography>}

        {loadingPost && <SkeletonPostDetails />}

        {!!recentPosts.length && (
          <>
            <Typography variant="h4" sx={{ my: 5 }}>
              Recent posts
            </Typography>

            <Box
              gap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              }}
            >
              {recentPosts.slice(recentPosts.length - 4).map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </Box>
          </>
        )}
      </Container>
    </>
  );
}
