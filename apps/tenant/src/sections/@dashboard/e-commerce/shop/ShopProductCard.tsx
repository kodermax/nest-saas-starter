import { paramCase } from 'change-case';
// next
import NextLink from 'next/link';
// @mui
import { Box, Card, Link, Stack, Fab } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// redux
import { useDispatch } from '../../../../redux/store';
import { addToCart } from '../../../../redux/slices/product';
// @types
import { IProduct } from '../../../../@types/product';
// components
import Iconify from '../../../../components/iconify';
import Label from '../../../../components/label';
import Image from '../../../../components/image';
import { ColorPreview } from '../../../../components/color-utils';

// ----------------------------------------------------------------------

type Props = {
  product: IProduct;
};

export default function ShopProductCard({ product }: Props) {
  const { id, name, cover, price, colors, status, available, sizes, priceSale } = product;

  const dispatch = useDispatch();

  const linkTo = PATH_DASHBOARD.eCommerce.view(paramCase(name));

  const handleAddCart = async () => {
    const newProduct = {
      id,
      name,
      cover,
      available,
      price,
      colors: [colors[0]],
      size: sizes[0],
      quantity: 1,
    };
    try {
      dispatch(addToCart(newProduct));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      sx={{
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ position: 'relative', p: 1 }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}

        <Fab
          color="warning"
          size="medium"
          className="add-cart-btn"
          onClick={handleAddCart}
          sx={{
            right: 16,
            bottom: 16,
            zIndex: 9,
            opacity: 0,
            position: 'absolute',
            transition: (theme) =>
              theme.transitions.create('all', {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.shorter,
              }),
          }}
        >
          <Iconify icon="ic:round-add-shopping-cart" />
        </Fab>

        <Image alt={name} src={cover} ratio="1/1" sx={{ borderRadius: 1.5 }} />
      </Box>

      <Stack spacing={2.5} sx={{ p: 3 }}>
        <NextLink href={linkTo} passHref>
          <Link color="inherit" variant="subtitle2" noWrap>
            {name}
          </Link>
        </NextLink>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colors} />

          <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
            {priceSale && (
              <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                {fCurrency(priceSale)}
              </Box>
            )}

            <Box component="span">{fCurrency(price)}</Box>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
