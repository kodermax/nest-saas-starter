import { useState } from 'react';
import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Avatar,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  CardProps,
  CardHeader,
  Typography,
  IconButton,
  TableContainer,
} from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/label';
import Iconify, { IconifyProps } from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import MenuPopover from '../../../../components/menu-popover';
import { TableHeadCustom } from '../../../../components/table';

// ----------------------------------------------------------------------

type RowProps = {
  id: string;
  name: string | null;
  avatar: string | null;
  type: string;
  message: string;
  category: string;
  date: number;
  status: string;
  amount: number;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: RowProps[];
  tableLabels: any;
}

export default function BankingRecentTransitions({
  title,
  subheader,
  tableLabels,
  tableData,
  ...other
}: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar sx={{ minWidth: 720 }}>
          <Table>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <BankingRecentTransitionsRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type BankingRecentTransitionsRowProps = {
  row: RowProps;
};

function BankingRecentTransitionsRow({ row }: BankingRecentTransitionsRowProps) {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleDownload = () => {
    handleClosePopover();
    console.log('DOWNLOAD', row.id);
  };

  const handlePrint = () => {
    handleClosePopover();
    console.log('PRINT', row.id);
  };

  const handleShare = () => {
    handleClosePopover();
    console.log('SHARE', row.id);
  };

  const handleDelete = () => {
    handleClosePopover();
    console.log('DELETE', row.id);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ position: 'relative' }}>
              {renderAvatar(row.category, row.avatar)}
              <Box
                sx={{
                  right: 0,
                  bottom: 0,
                  width: 18,
                  height: 18,
                  display: 'flex',
                  borderRadius: '50%',
                  position: 'absolute',
                  alignItems: 'center',
                  color: 'common.white',
                  bgcolor: 'error.main',
                  justifyContent: 'center',
                  ...(row.type === 'Income' && {
                    bgcolor: 'success.main',
                  }),
                }}
              >
                <Iconify
                  icon={
                    row.type === 'Income'
                      ? 'eva:diagonal-arrow-left-down-fill'
                      : 'eva:diagonal-arrow-right-up-fill'
                  }
                  width={16}
                />
              </Box>
            </Box>
            <Box sx={{ ml: 2 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {row.message}
              </Typography>
              <Typography variant="subtitle2"> {row.category}</Typography>
            </Box>
          </Box>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{format(new Date(row.date), 'dd MMM yyyy')}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {format(new Date(row.date), 'p')}
          </Typography>
        </TableCell>

        <TableCell>{fCurrency(row.amount)}</TableCell>

        <TableCell>
          <Label
            variant={isLight ? 'soft' : 'filled'}
            color={
              (row.status === 'completed' && 'success') ||
              (row.status === 'in_progress' && 'warning') ||
              'error'
            }
          >
            {sentenceCase(row.status)}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem onClick={handleDownload}>
          <Iconify icon="eva:download-fill" />
          Download
        </MenuItem>

        <MenuItem onClick={handlePrint}>
          <Iconify icon="eva:printer-fill" />
          Print
        </MenuItem>

        <MenuItem onClick={handleShare}>
          <Iconify icon="eva:share-fill" />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

type AvatarIconProps = {
  icon: IconifyProps;
};

function AvatarIcon({ icon }: AvatarIconProps) {
  return (
    <Avatar
      sx={{
        width: 48,
        height: 48,
        color: 'text.secondary',
        bgcolor: 'background.neutral',
      }}
    >
      <Iconify icon={icon} width={24} />
    </Avatar>
  );
}

// ----------------------------------------------------------------------

function renderAvatar(category: string, avatar: string | null) {
  if (category === 'Books') {
    return <AvatarIcon icon="eva:book-fill" />;
  }
  if (category === 'Beauty & Health') {
    return <AvatarIcon icon="eva:heart-fill" />;
  }
  return avatar ? (
    <Avatar
      alt={category}
      src={avatar}
      sx={{ width: 48, height: 48, boxShadow: (theme) => theme.customShadows.z8 }}
    />
  ) : null;
}
