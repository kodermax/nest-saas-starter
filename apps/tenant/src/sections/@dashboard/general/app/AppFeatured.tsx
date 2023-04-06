import { m } from 'framer-motion';
import { useState, useRef } from 'react';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Stack, Card, Typography, Link, CardProps } from '@mui/material';
// components
import Image from '../../../../components/image';
import { MotionContainer, varFade } from '../../../../components/animate';
import Carousel, { CarouselDots, CarouselArrows } from '../../../../components/carousel';

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

type ItemProps = {
  id: string;
  image: string;
  title: string;
  description: string;
};

interface Props extends CardProps {
  list: ItemProps[];
}

export default function AppFeatured({ list, ...other }: Props) {
  const theme = useTheme();

  const carouselRef = useRef<Carousel>(null);

  const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? list.length - 1 : 0);

  const carouselSettings = {
    speed: 800,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
    ...CarouselDots({
      sx: {
        top: 20,
        left: 20,
        position: 'absolute',
      },
    }),
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Card {...other}>
      <Carousel ref={carouselRef} {...carouselSettings}>
        {list.map((app, index) => (
          <CarouselItem key={app.id} item={app} isActive={index === currentIndex} />
        ))}
      </Carousel>

      <CarouselArrows
        onNext={handleNext}
        onPrevious={handlePrev}
        sx={{ top: 8, right: 8, position: 'absolute', color: 'common.white' }}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: ItemProps;
  isActive?: boolean;
};

function CarouselItem({ item, isActive }: CarouselItemProps) {
  const { image, title, description } = item;

  return (
    <MotionContainer action animate={isActive} sx={{ position: 'relative' }}>
      <Stack
        spacing={1}
        sx={{
          p: 3,
          width: 1,
          bottom: 0,
          zIndex: 9,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <m.div variants={varFade().inRight}>
          <Typography variant="overline" component="div" sx={{ opacity: 0.48 }}>
            Featured App
          </Typography>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Link color="inherit" underline="none">
            <Typography variant="h5" noWrap>
              {title}
            </Typography>
          </Link>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Typography variant="body2" noWrap>
            {description}
          </Typography>
        </m.div>
      </Stack>

      <StyledOverlay />

      <Image
        alt={title}
        src={image}
        sx={{
          height: { xs: 280, xl: 320 },
        }}
      />
    </MotionContainer>
  );
}
