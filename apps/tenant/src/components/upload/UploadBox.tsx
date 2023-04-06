import { useDropzone } from 'react-dropzone';
// @mui
import { styled, alpha } from '@mui/material/styles';
//
import Iconify from '../iconify';
//
import { UploadProps } from './types';

// ----------------------------------------------------------------------

const StyledDropZone = styled('div')(({ theme }) => ({
  width: 64,
  height: 64,
  fontSize: 24,
  display: 'flex',
  flexShrink: 0,
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  margin: theme.spacing(0.5),
  color: theme.palette.text.disabled,
  borderRadius: theme.shape.borderRadius,
  border: `dashed 1px ${theme.palette.divider}`,
  backgroundColor: alpha(theme.palette.grey[500], 0.08),
  '&:hover': {
    opacity: 0.72,
  },
}));

// ----------------------------------------------------------------------

export default function UploadBox({ placeholder, error, disabled, sx, ...other }: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    disabled,
    ...other,
  });

  const isError = isDragReject || !!error;

  return (
    <StyledDropZone
      {...getRootProps()}
      sx={{
        ...(isDragActive && {
          opacity: 0.72,
        }),
        ...(isError && {
          color: 'error.main',
          bgcolor: 'error.lighter',
          borderColor: 'error.light',
        }),
        ...(disabled && {
          opacity: 0.48,
          pointerEvents: 'none',
        }),
        ...sx,
      }}
    >
      <input {...getInputProps()} />

      {placeholder || <Iconify icon="eva:cloud-upload-fill" width={28} />}
    </StyledDropZone>
  );
}
