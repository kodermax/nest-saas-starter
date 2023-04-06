import { TreeProps } from 'react-organizational-chart';
// @mui
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material';

// ----------------------------------------------------------------------

type VariantValue = 'simple' | 'standard' | 'group';

export type ItemProps = {
  name: string;
  group?: string;
  role?: string | null;
  avatar?: string | null;
  children?: any;
};

export type ListProps = {
  data: ItemProps;
  depth: number;
  variant?: VariantValue;
  sx?: SxProps<Theme>;
};

export type SubListProps = {
  data: ItemProps[];
  depth: number;
  variant?: VariantValue;
  sx?: SxProps<Theme>;
};

export type OrganizationalChartProps = Partial<TreeProps> & {
  data: {
    name: string;
    children: ItemProps[];
  };
  variant?: VariantValue;
  sx?: SxProps<Theme>;
};
