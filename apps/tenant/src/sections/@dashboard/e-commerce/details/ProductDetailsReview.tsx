import { useState } from 'react';
import sumBy from 'lodash/sumBy';
// @mui
import { Divider, Typography, Rating, Button, LinearProgress, Stack, Box } from '@mui/material';
// utils
import { fShortenNumber } from '../../../../utils/formatNumber';
// @types
import { IProduct } from '../../../../@types/product';
// components
import Iconify from '../../../../components/iconify';
//
import ProductDetailsReviewList from './ProductDetailsReviewList';
import ProductDetailsReviewNewDialog from './ProductDetailsNewReviewForm';

// ----------------------------------------------------------------------

type Props = {
  product: IProduct;
};

export default function ProductDetailsReview({ product }: Props) {
  const { totalRating, totalReview, ratings } = product;

  const [openReview, setOpenReview] = useState(false);

  const handleOpenReview = () => {
    setOpenReview(true);
  };

  const handleCloseReview = () => {
    setOpenReview(false);
  };

  const total = sumBy(ratings, (star) => star.starCount);

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={1}
          sx={{
            pt: { xs: 5, md: 0 },
            pb: { xs: 3, md: 0 },
          }}
        >
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Average rating
          </Typography>

          <Typography variant="h2">{totalRating}/5</Typography>

          <Rating readOnly value={totalRating} precision={0.1} />

          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            ({fShortenNumber(totalReview)} reviews)
          </Typography>
        </Stack>

        <Stack
          spacing={1.5}
          sx={{
            p: 3,
            py: { md: 5 },
            borderLeft: (theme) => ({ md: `dashed 1px ${theme.palette.divider}` }),
            borderRight: (theme) => ({ md: `dashed 1px ${theme.palette.divider}` }),
          }}
        >
          {ratings
            .slice(0)
            .reverse()
            .map((rating) => (
              <ProgressItem key={rating.name} star={rating} total={total} />
            ))}
        </Stack>

        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            pt: { xs: 3, md: 0 },
            pb: { xs: 5, md: 0 },
          }}
        >
          <Button
            color="inherit"
            size="large"
            onClick={handleOpenReview}
            variant="outlined"
            startIcon={<Iconify icon="eva:edit-fill" />}
          >
            Write your review
          </Button>
        </Stack>
      </Box>

      <Divider />

      <ProductDetailsReviewList reviews={product.reviews} />

      <ProductDetailsReviewNewDialog open={openReview} onClose={handleCloseReview} />
    </>
  );
}

// ----------------------------------------------------------------------

type ProgressItemProps = {
  star: {
    name: string;
    starCount: number;
    reviewCount: number;
  };
  total: number;
};

function ProgressItem({ star, total }: ProgressItemProps) {
  const { name, starCount, reviewCount } = star;

  return (
    <Stack direction="row" alignItems="center">
      <Typography variant="subtitle2" sx={{ width: 42 }}>
        {name}
      </Typography>

      <LinearProgress
        color="inherit"
        variant="determinate"
        value={(starCount / total) * 100}
        sx={{
          mx: 2,
          flexGrow: 1,
        }}
      />

      <Typography
        variant="body2"
        sx={{
          minWidth: 48,
          color: 'text.secondary',
        }}
      >
        {fShortenNumber(reviewCount)}
      </Typography>
    </Stack>
  );
}
