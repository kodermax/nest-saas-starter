import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material';
import { Options } from 'react-markdown';

// ----------------------------------------------------------------------

export interface MarkdownProps extends Options {
  sx?: SxProps<Theme>;
}
