import { useRef } from 'react';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Typography, IconButton } from '@mui/material';
// utils
import { bgBlur } from '../../../../utils/cssStyles';
// components
import Image from '../../../../components/image';
import Iconify from '../../../../components/iconify';
import Carousel, { CarouselArrows } from '../../../../components/carousel';

// ----------------------------------------------------------------------

const StyledContentItem = styled('div')(({ theme }) => ({
  ...bgBlur({ color: theme.palette.grey[900] }),
  bottom: 0,
  zIndex: 9,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  padding: theme.spacing(3),
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
  justifyContent: 'space-between',
  flexDirection: theme.direction === 'rtl' ? 'row-reverse' : 'row',
}));

// ----------------------------------------------------------------------

type Props = {
  data: {
    id: string;
    title: string;
    image: string;
    description: string;
  }[];
};

export default function CarouselBasic4({ data }: Props) {
  const theme = useTheme();

  const carouselRef = useRef<Carousel | null>(null);

  const carouselSettings = {
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: Boolean(theme.direction !== 'rtl'),
    rtl: Boolean(theme.direction === 'rtl'),
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Card>
      <CarouselArrows filled shape="rounded" onNext={handleNext} onPrevious={handlePrev}>
        <Carousel ref={carouselRef} {...carouselSettings}>
          {data.map((item) => (
            <CarouselItem key={item.id} item={item} />
          ))}
        </Carousel>
      </CarouselArrows>
    </Card>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  title: string;
  description: string;
  image: string;
};

function CarouselItem({ item }: { item: CarouselItemProps }) {
  const { image, title } = item;

  return (
    <Box sx={{ position: 'relative', zIndex: 0 }}>
      <Image alt={title} src={image} ratio="1/1" />

      <StyledContentItem>
        <Typography variant="h6" sx={{ color: 'common.white' }}>
          {item.title}
        </Typography>
        <IconButton
          onClick={() => {}}
          sx={{
            color: 'common.white',
            '&:hover': {
              bgcolor: (theme) =>
                alpha(theme.palette.common.white, theme.palette.action.hoverOpacity),
            },
          }}
        >
          <Iconify icon="eva:more-horizontal-fill" />
        </IconButton>
      </StyledContentItem>
    </Box>
  );
}
