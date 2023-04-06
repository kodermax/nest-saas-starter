import { useRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Paper, Avatar, BoxProps, Typography, CardHeader } from '@mui/material';
// utils
import { fDateTime } from '../../../../utils/formatTime';
// components
import Label from '../../../../components/label';
import Image from '../../../../components/image';
import Iconify from '../../../../components/iconify';
import Carousel, { CarouselArrows } from '../../../../components/carousel';

// ----------------------------------------------------------------------

type ItemProps = {
  id: string;
  name: string;
  avatar: string;
  bookdAt: Date | string | number;
  roomNumber: string;
  person: string;
  roomType: string;
  cover: string;
};

interface Props extends BoxProps {
  title?: string;
  subheader?: string;
  list: ItemProps[];
}

export default function BookingNewestBooking({ title, subheader, list, sx, ...other }: Props) {
  const theme = useTheme();

  const carouselRef = useRef<Carousel | null>(null);

  const carouselSettings = {
    dots: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box sx={{ py: 2, ...sx }} {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={<CarouselArrows onNext={handleNext} onPrevious={handlePrev} />}
        sx={{
          p: 0,
          mb: 3,
          '& .MuiCardHeader-action': { alignSelf: 'center' },
        }}
      />

      <Carousel ref={carouselRef} {...carouselSettings}>
        {list.map((item) => (
          <BookingItem key={item.id} item={item} />
        ))}
      </Carousel>
    </Box>
  );
}

// ----------------------------------------------------------------------

type BookingItemProps = {
  item: ItemProps;
};

function BookingItem({ item }: BookingItemProps) {
  const { avatar, name, roomNumber, bookdAt, person, cover, roomType } = item;

  return (
    <Paper sx={{ mx: 1.5, borderRadius: 2, bgcolor: 'background.neutral' }}>
      <Stack spacing={2.5} sx={{ p: 3, pb: 2.5 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={name} src={avatar} />

          <div>
            <Typography variant="subtitle2">{name}</Typography>

            <Typography
              variant="caption"
              sx={{ color: 'text.disabled', mt: 0.5, display: 'block' }}
            >
              {fDateTime(bookdAt)}
            </Typography>
          </div>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={3} sx={{ color: 'text.secondary' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon="ic:round-vpn-key" width={16} />
            <Typography variant="caption">Room {roomNumber}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon="eva:people-fill" width={16} />
            <Typography variant="caption">{person} Person</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Box sx={{ p: 1, position: 'relative' }}>
        <Label
          variant="filled"
          color={(roomType === 'king' && 'error') || (roomType === 'double' && 'info') || 'warning'}
          sx={{
            right: 16,
            zIndex: 9,
            bottom: 16,
            position: 'absolute',
          }}
        >
          {roomType}
        </Label>

        <Image alt="cover" src={cover} ratio="1/1" sx={{ borderRadius: 1.5 }} />
      </Box>
    </Paper>
  );
}
