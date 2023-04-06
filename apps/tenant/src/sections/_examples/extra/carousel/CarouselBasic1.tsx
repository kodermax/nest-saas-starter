import { useState, useRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Card } from '@mui/material';
// components
import Image from '../../../../components/image';
import Carousel, { CarouselArrowIndex } from '../../../../components/carousel';

// ----------------------------------------------------------------------

type Props = {
  data: {
    id: string;
    title: string;
    image: string;
    description: string;
  }[];
};

export default function CarouselBasic1({ data }: Props) {
  const theme = useTheme();

  const carouselRef = useRef<Carousel | null>(null);

  const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? data.length - 1 : 0);

  const carouselSettings = {
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Card>
      <Carousel ref={carouselRef} {...carouselSettings}>
        {data.map((item) => (
          <Image key={item.id} alt={item.title} src={item.image} ratio="1/1" />
        ))}
      </Carousel>

      <CarouselArrowIndex
        index={currentIndex}
        total={data.length}
        onNext={handleNext}
        onPrevious={handlePrev}
      />
    </Card>
  );
}
