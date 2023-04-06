import { useState } from 'react';
// @mui
import { Stack, Button, Rating, Avatar, Pagination, Typography } from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fShortenNumber } from '../../../../utils/formatNumber';
// @types
import { IProductReview } from '../../../../@types/product';
// components
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

type Props = {
  reviews: IProductReview[];
};

export default function ProductDetailsReviewList({ reviews }: Props) {
  return (
    <>
      <Stack
        spacing={5}
        sx={{
          pt: 5,
          pl: {
            xs: 2.5,
            md: 0,
          },
          pr: {
            xs: 2.5,
            md: 5,
          },
        }}
      >
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </Stack>

      <Stack
        alignItems={{
          xs: 'center',
          md: 'flex-end',
        }}
        sx={{
          my: 5,
          mr: { md: 5 },
        }}
      >
        <Pagination count={10} />
      </Stack>
    </>
  );
}

// ----------------------------------------------------------------------

type ReviewItemProps = {
  review: IProductReview;
};

function ReviewItem({ review }: ReviewItemProps) {
  const { name, rating, comment, helpful, postedAt, avatarUrl, isPurchased } = review;

  const [isHelpful, setIsHelpful] = useState(false);

  return (
    <Stack
      spacing={2}
      direction={{
        xs: 'column',
        md: 'row',
      }}
    >
      <Stack
        spacing={2}
        alignItems="center"
        direction={{
          xs: 'row',
          md: 'column',
        }}
        sx={{
          width: { md: 240 },
          textAlign: { md: 'center' },
        }}
      >
        <Avatar
          src={avatarUrl}
          sx={{
            width: { md: 64 },
            height: { md: 64 },
          }}
        />

        <Stack spacing={{ md: 0.5 }}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>

          <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
            {fDate(postedAt)}
          </Typography>
        </Stack>
      </Stack>

      <Stack spacing={1} flexGrow={1}>
        <Rating size="small" value={rating} precision={0.1} readOnly />

        {isPurchased && (
          <Typography
            variant="caption"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'success.main',
            }}
          >
            <Iconify icon="ic:round-verified" width={16} sx={{ mr: 0.5 }} />
            Verified purchase
          </Typography>
        )}

        <Typography variant="body2">{comment}</Typography>

        <Stack
          spacing={1}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          direction={{ xs: 'column', sm: 'row' }}
        >
          {!isHelpful && (
            <Typography variant="subtitle2">Was this review helpful to you?</Typography>
          )}

          <Button
            size="small"
            color="inherit"
            startIcon={<Iconify icon={!isHelpful ? 'ic:round-thumb-up' : 'eva:checkmark-fill'} />}
            onClick={() => setIsHelpful(!isHelpful)}
          >
            {isHelpful ? 'Helpful' : 'Thank'}({fShortenNumber(!isHelpful ? helpful : helpful + 1)})
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
