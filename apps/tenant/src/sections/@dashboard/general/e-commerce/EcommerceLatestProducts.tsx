// @mui
import { Box, Link, Card, CardHeader, Typography, Stack, CardProps } from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
//
import Image from '../../../../components/image';
import Scrollbar from '../../../../components/scrollbar';
import { ColorPreview } from '../../../../components/color-utils';

// ----------------------------------------------------------------------

type ItemProps = {
  id: string;
  name: string;
  image: string;
  price: number;
  priceSale: number;
  colors: string[];
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  list: ItemProps[];
}

export default function EcommerceLatestProducts({ title, subheader, list, ...other }: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ProductItemProps = {
  product: ItemProps;
};

function ProductItem({ product }: ProductItemProps) {
  const { name, image, price, priceSale } = product;

  const hasSale = priceSale > 0;

  return (
    <Stack direction="row" spacing={2}>
      <Image
        alt={name}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ flexGrow: 1, minWidth: 200 }}>
        <Link sx={{ color: 'text.primary', typography: 'subtitle2' }}>{name}</Link>

        <Stack direction="row">
          {hasSale && (
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', textDecoration: 'line-through' }}
            >
              {fCurrency(priceSale)}
            </Typography>
          )}
          &nbsp;
          <Typography variant="body2" sx={{ color: priceSale ? 'error.main' : 'text.secondary' }}>
            {fCurrency(price)}
          </Typography>
        </Stack>
      </Box>

      <ColorPreview limit={3} colors={product.colors} sx={{ minWidth: 72, pr: 3 }} />
    </Stack>
  );
}
