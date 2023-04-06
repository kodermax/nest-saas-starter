import { useEffect } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Grid, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import {
  resetCart,
  getCart,
  nextStep,
  backStep,
  gotoStep,
  deleteCart,
  createBilling,
  applyShipping,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
} from '../../../redux/slices/product';
// @types
import { ICheckoutBillingAddress } from '../../../@types/product';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
// sections
import {
  CheckoutCart,
  CheckoutSteps,
  CheckoutPayment,
  CheckoutOrderComplete,
  CheckoutBillingAddress,
} from '../../../sections/@dashboard/e-commerce/checkout';

// ----------------------------------------------------------------------

const STEPS = ['Cart', 'Billing & address', 'Payment'];

// ----------------------------------------------------------------------

EcommerceCheckoutPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function EcommerceCheckoutPage() {
  const { replace } = useRouter();

  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  const { checkout } = useSelector((state) => state.product);

  const { cart, billing, activeStep } = checkout;

  const completed = activeStep === STEPS.length;

  useEffect(() => {
    dispatch(getCart(cart));
  }, [dispatch, cart]);

  useEffect(() => {
    if (activeStep === 1) {
      dispatch(createBilling(null));
    }
  }, [dispatch, activeStep]);

  const handleNextStep = () => {
    dispatch(nextStep());
  };

  const handleBackStep = () => {
    dispatch(backStep());
  };

  const handleGotoStep = (step: number) => {
    dispatch(gotoStep(step));
  };

  const handleApplyDiscount = (value: number) => {
    if (cart.length) {
      dispatch(applyDiscount(value));
    }
  };

  const handleDeleteCart = (productId: string) => {
    dispatch(deleteCart(productId));
  };

  const handleIncreaseQuantity = (productId: string) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId: string) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleCreateBilling = (address: ICheckoutBillingAddress) => {
    dispatch(createBilling(address));
    dispatch(nextStep());
  };

  const handleApplyShipping = (value: number) => {
    dispatch(applyShipping(value));
  };

  const handleReset = () => {
    if (completed) {
      dispatch(resetCart());
      replace(PATH_DASHBOARD.eCommerce.shop);
    }
  };

  return (
    <>
      <Head>
        <title> Ecommerce: Checkout | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Checkout"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            { name: 'Checkout' },
          ]}
        />

        <Grid container justifyContent={completed ? 'center' : 'flex-start'}>
          <Grid item xs={12} md={8}>
            <CheckoutSteps activeStep={activeStep} steps={STEPS} />
          </Grid>
        </Grid>

        {completed ? (
          <CheckoutOrderComplete open={completed} onReset={handleReset} onDownloadPDF={() => {}} />
        ) : (
          <>
            {activeStep === 0 && (
              <CheckoutCart
                checkout={checkout}
                onNextStep={handleNextStep}
                onDeleteCart={handleDeleteCart}
                onApplyDiscount={handleApplyDiscount}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
              />
            )}
            {activeStep === 1 && (
              <CheckoutBillingAddress
                checkout={checkout}
                onBackStep={handleBackStep}
                onCreateBilling={handleCreateBilling}
              />
            )}
            {activeStep === 2 && billing && (
              <CheckoutPayment
                checkout={checkout}
                onNextStep={handleNextStep}
                onBackStep={handleBackStep}
                onGotoStep={handleGotoStep}
                onApplyShipping={handleApplyShipping}
                onReset={handleReset}
              />
            )}
          </>
        )}
      </Container>
    </>
  );
}
