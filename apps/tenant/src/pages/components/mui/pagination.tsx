import { useState, useEffect } from 'react';
// next
import Head from 'next/head';
// @mui
import { Box, Container, Pagination, TablePagination } from '@mui/material';
import { Masonry } from '@mui/lab';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import MainLayout from '../../../layouts/main';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import { Block } from '../../../sections/_examples/Block';

// ----------------------------------------------------------------------

const COLORS = ['standard', 'primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

const SIZES = ['small', 'medium', 'large'] as const;

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { my: 1 },
} as const;

// ----------------------------------------------------------------------

MUIPaginationPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function MUIPaginationPage() {
  const [page, setPage] = useState(2);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title> MUI Components: Pagination | Minimal UI</title>
      </Head>

      <Box
        sx={{
          pt: 6,
          pb: 1,
          bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'),
        }}
      >
        <Container>
          <CustomBreadcrumbs
            heading="Pagination"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Pagination' },
            ]}
            moreLink={['https://mui.com/components/pagination']}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
          <Block title="Circular" sx={style}>
            <Pagination shape="circular" count={10} />
            <Pagination shape="circular" count={10} disabled />
            <Pagination shape="circular" count={10} variant="outlined" />
            <Pagination shape="circular" count={10} variant="outlined" disabled />
            <Pagination shape="circular" count={10} variant="soft" />
            <Pagination shape="circular" count={10} variant="soft" disabled />
          </Block>

          <Block title="Rounded" sx={style}>
            <Pagination shape="rounded" count={10} />
            <Pagination shape="rounded" count={10} disabled />
            <Pagination shape="rounded" count={10} variant="outlined" />
            <Pagination shape="rounded" count={10} variant="outlined" disabled />
            <Pagination shape="rounded" count={10} variant="soft" />
            <Pagination shape="rounded" count={10} variant="soft" disabled />
          </Block>

          <Block title="Colors" sx={style}>
            {COLORS.map((color) => (
              <Pagination key={color} color={color} count={10} />
            ))}

            {COLORS.map((color) => (
              <Pagination key={color} color={color} count={10} variant="outlined" />
            ))}

            {COLORS.map((color) => (
              <Pagination key={color} color={color} count={10} variant="soft" />
            ))}
          </Block>

          <Block title="Size" sx={style}>
            {SIZES.map((size) => (
              <Pagination count={10} key={size} size={size} />
            ))}
          </Block>

          <Block title="Buttons" sx={style}>
            <Pagination count={10} showFirstButton showLastButton />
            <Pagination count={10} hidePrevButton hideNextButton />
          </Block>

          <Block title="Ranges" sx={style}>
            <Pagination count={11} defaultPage={6} siblingCount={0} />
            <Pagination count={11} defaultPage={6} />
            <Pagination count={11} defaultPage={6} siblingCount={0} boundaryCount={2} />
            <Pagination count={11} defaultPage={6} boundaryCount={2} />
          </Block>

          <Block title="Table" sx={style}>
            <TablePagination
              component="div"
              count={100}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Block>
        </Masonry>
      </Container>
    </>
  );
}
