import { useEffect } from 'react';
import { paramCase } from 'change-case';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../../redux/store';
import { getProducts } from '../../../../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../../../../routes/paths';
// layouts
import DashboardLayout from '../../../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../../../components/settings';
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
// sections
import ProductNewEditForm from '../../../../../sections/@dashboard/e-commerce/ProductNewEditForm';

// ----------------------------------------------------------------------

EcommerceProductEditPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function EcommerceProductEditPage() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  const {
    query: { name },
  } = useRouter();

  const currentProduct = useSelector((state) =>
    state.product.products.find((product) => paramCase(product.name) === name)
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title> Ecommerce: Edit product | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit product"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            { name: currentProduct?.name },
          ]}
        />

        <ProductNewEditForm isEdit currentProduct={currentProduct} />
      </Container>
    </>
  );
}
