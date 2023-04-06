// @mui
import { Variant } from '@mui/material/styles/createTypography';
import { TypographyProps, LinkProps } from '@mui/material';
//

// ----------------------------------------------------------------------

type IProps = TypographyProps & LinkProps;

export interface TextMaxLineProps extends IProps {
  line?: number;
  asLink?: boolean;
  persistent?: boolean;
  children: React.ReactNode;
  variant?: Variant;
}
