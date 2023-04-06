// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Button, CardContent, Typography, CardProps } from '@mui/material';
// utils
import { bgGradient } from '../../../../utils/cssStyles';
// components
import Image from '../../../../components/image';
import Carousel, { CarouselDots } from '../../../../components/carousel';

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  ...bgGradient({
    startColor: `${alpha(theme.palette.common.black, 0)} 0%`,
    endColor: `${theme.palette.common.black} 75%`,
  }),
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  position: 'absolute',
}));

// ----------------------------------------------------------------------

type ItemProps = {
  id: string;
  image: string;
  name: string;
};

interface Props extends CardProps {
  list: ItemProps[];
}

export default function EcommerceNewProducts({ list, ...other }: Props) {
  const theme = useTheme();

  const carouselSettings = {
    speed: 1000,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      sx: {
        right: 24,
        bottom: 24,
        position: 'absolute',
      },
    }),
  };

  return (
    <Card {...other}>
      <Carousel {...carouselSettings}>
        {list.map((item) => (
          <CarouselItem key={item.id} item={item} />
        ))}
      </Carousel>
    </Card>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: ItemProps;
};

function CarouselItem({ item }: CarouselItemProps) {
  const { image, name } = item;

  return (
    <Box sx={{ position: 'relative' }}>
      <CardContent
        sx={{
          left: 0,
          bottom: 0,
          zIndex: 9,
          maxWidth: '80%',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <Typography variant="overline" sx={{ opacity: 0.48 }}>
          New
        </Typography>

        <Typography noWrap variant="h5" sx={{ mt: 1, mb: 3 }}>
          {name}
        </Typography>

        <Button variant="contained">Buy Now</Button>
      </CardContent>

      <StyledOverlay />

      <Image
        alt={name}
        src={image}
        sx={{
          height: { xs: 280, xl: 320 },
        }}
      />
    </Box>
  );
}
