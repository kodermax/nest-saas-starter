// @mui
import {
  Box,
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  CardProps,
  CardHeader,
  Typography,
  TableContainer,
} from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/label';
import Image from '../../../../components/image';
import Scrollbar from '../../../../components/scrollbar';
import { TableHeadCustom } from '../../../../components/table';

// ----------------------------------------------------------------------

type RowProps = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  category: string;
  flag: string;
  total: number;
  rank: string;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: RowProps[];
  tableLabels: any;
}

export default function EcommerceBestSalesman({
  title,
  subheader,
  tableData,
  tableLabels,
  ...other
}: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 720 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <EcommerceBestSalesmanRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Card>
  );
}

// ----------------------------------------------------------------------

type EcommerceBestSalesmanRowProps = {
  row: RowProps;
};

function EcommerceBestSalesmanRow({ row }: EcommerceBestSalesmanRowProps) {
  return (
    <TableRow>
      <TableCell>
        <Stack direction="row" alignItems="center">
          <Avatar alt={row.name} src={row.avatar} />

          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2"> {row.name} </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {row.email}
            </Typography>
          </Box>
        </Stack>
      </TableCell>

      <TableCell>{row.category}</TableCell>

      <TableCell>
        <Image src={row.flag} alt="country flag" sx={{ maxWidth: 28, mx: 'auto' }} />
      </TableCell>

      <TableCell>{fCurrency(row.total)}</TableCell>

      <TableCell align="right">
        <Label
          variant="soft"
          color={
            (row.rank === 'Top 1' && 'primary') ||
            (row.rank === 'Top 2' && 'info') ||
            (row.rank === 'Top 3' && 'success') ||
            (row.rank === 'Top 4' && 'warning') ||
            'error'
          }
        >
          {row.rank}
        </Label>
      </TableCell>
    </TableRow>
  );
}
