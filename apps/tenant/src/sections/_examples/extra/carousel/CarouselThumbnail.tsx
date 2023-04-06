import { useState, useRef, useEffect } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box } from '@mui/material';
// utils
import { bgGradient } from '../../../../utils/cssStyles';
// components
import Image from '../../../../components/image';
import Carousel, { CarouselArrowIndex } from '../../../../components/carousel';

// ----------------------------------------------------------------------

const THUMB_SIZE = 64;

type Props = {
  data: {
    id: string;
    title: string;
    image: string;
    description: string;
  }[];
};

type StyledThumbnailsContainerProps = {
  length: number;
};

const StyledThumbnailsContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'length',
})<StyledThumbnailsContainerProps>(({ length, theme }) => ({
  margin: theme.spacing(0, 'auto'),
  position: 'relative',

  '& .slick-slide': {
    opacity: 0.48,
    '&.slick-current': {
      opacity: 1,
    },
    '& > div': {
      padding: theme.spacing(0, 0.75),
    },
  },

  ...(length === 1 && {
    maxWidth: THUMB_SIZE * 1 + 16,
  }),
  ...(length === 2 && {
    maxWidth: THUMB_SIZE * 2 + 32,
  }),
  ...((length === 3 || length === 4) && {
    maxWidth: THUMB_SIZE * 3 + 48,
  }),
  ...(length >= 5 && {
    maxWidth: THUMB_SIZE * 6,
  }),
  ...(length > 2 && {
    '&:before, &:after': {
      ...bgGradient({
        direction: 'to left',
        startColor: `${alpha(theme.palette.background.default, 0)} 0%`,
        endColor: `${theme.palette.background.default} 100%`,
      }),
      top: 0,
      zIndex: 9,
      content: "''",
      height: '100%',
      position: 'absolute',
      width: (THUMB_SIZE * 2) / 3,
    },
    '&:after': {
      right: 0,
      transform: 'scaleX(-1)',
    },
  }),
}));

// ----------------------------------------------------------------------

export default function CarouselThumbnail({ data }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [nav1, setNav1] = useState<Carousel | undefined>(undefined);

  const [nav2, setNav2] = useState<Carousel | undefined>(undefined);

  const carousel1 = useRef<Carousel | null>(null);

  const carousel2 = useRef<Carousel | null>(null);

  const carouselSettings1 = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
  };

  const carouselSettings2 = {
    dots: false,
    arrows: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    centerPadding: '0px',
    slidesToShow: data.length > 3 ? 3 : data.length,
  };

  useEffect(() => {
    if (carousel1.current) {
      setNav1(carousel1.current);
    }
    if (carousel2.current) {
      setNav2(carousel2.current);
    }
  }, []);

  const handlePrev = () => {
    carousel2.current?.slickPrev();
  };

  const handleNext = () => {
    carousel2.current?.slickNext();
  };

  const renderLargeImg = (
    <Box
      sx={{
        mb: 3,
        zIndex: 0,
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Carousel {...carouselSettings1} asNavFor={nav2} ref={carousel1}>
        {data.map((item) => (
          <Image key={item.id} alt={item.title} src={item.image} ratio="16/9" />
        ))}
      </Carousel>

      <CarouselArrowIndex
        index={currentIndex}
        total={data.length}
        onNext={handleNext}
        onPrevious={handlePrev}
      />
    </Box>
  );

  const renderThumbnails = (
    <StyledThumbnailsContainer length={data.length}>
      <Carousel {...carouselSettings2} asNavFor={nav1} ref={carousel2}>
        {data.map((item, index) => (
          <Image
            key={item.id}
            disabledEffect
            alt={item.title}
            src={item.image}
            sx={{
              width: THUMB_SIZE,
              height: THUMB_SIZE,
              borderRadius: 1.5,
              cursor: 'pointer',
              ...(currentIndex === index && {
                border: (theme) => `solid 2px ${theme.palette.primary.main}`,
              }),
            }}
          />
        ))}
      </Carousel>
    </StyledThumbnailsContainer>
  );

  return (
    <Box
      sx={{
        '& .slick-slide': {
          float: (theme) => (theme.direction === 'rtl' ? 'right' : 'left'),
        },
      }}
    >
      {renderLargeImg}

      {renderThumbnails}
    </Box>
  );
}
