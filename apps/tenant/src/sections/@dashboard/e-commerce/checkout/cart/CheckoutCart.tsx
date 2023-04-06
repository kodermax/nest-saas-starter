import sum from 'lodash/sum';
// next
import NextLink from 'next/link';
// @mui
import { Grid, Card, Button, CardHeader, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../../routes/paths';
// @types
import { IProductCheckoutState } from '../../../../../@types/product';
// components
import Iconify from '../../../../../components/iconify';
import EmptyContent from '../../../../../components/empty-content';
//
import CheckoutSummary from '../CheckoutSummary';
import CheckoutCartProductList from './CheckoutCartProductList';

// ----------------------------------------------------------------------

type Props = {
  checkout: IProductCheckoutState;
  onNextStep: VoidFunction;
  onApplyDiscount: (value: number) => void;
  onDeleteCart: (productId: string) => void;
  onIncreaseQuantity: (productId: string) => void;
  onDecreaseQuantity: (productId: string) => void;
};

export default function CheckoutCart({
  checkout,
  onNextStep,
  onApplyDiscount,
  onDeleteCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: Props) {
  const { cart, total, discount, subtotal } = checkout;

  const totalItems = sum(cart.map((item) => item.quantity));

  const isEmptyCart = !cart.length;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant="h6">
                Cart
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  &nbsp;({totalItems} item)
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {!isEmptyCart ? (
            <CheckoutCartProductList
              products={cart}
              onDelete={onDeleteCart}
              onIncreaseQuantity={onIncreaseQuantity}
              onDecreaseQuantity={onDecreaseQuantity}
            />
          ) : (
            <EmptyContent
              title="Cart is empty"
              description="Look like you have no items in your shopping cart."
              img="/assets/illustrations/illustration_empty_cart.svg"
            />
          )}
        </Card>

        <NextLink href={PATH_DASHBOARD.eCommerce.root} passHref>
          <Button color="inherit" startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}>
            Continue Shopping
          </Button>
        </NextLink>
      </Grid>

      <Grid item xs={12} md={4}>
        <CheckoutSummary
          enableDiscount
          total={total}
          discount={discount}
          subtotal={subtotal}
          onApplyDiscount={onApplyDiscount}
        />
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={!cart.length}
          onClick={onNextStep}
        >
          Check Out
        </Button>
      </Grid>
    </Grid>
  );
}
