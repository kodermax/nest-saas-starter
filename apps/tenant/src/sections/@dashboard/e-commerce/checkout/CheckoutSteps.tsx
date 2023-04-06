// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Step,
  Stack,
  Stepper,
  StepLabel,
  StepperProps,
  StepConnector as MUIStepConnector,
} from '@mui/material';
// components
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

const StepConnector = styled(MUIStepConnector)(({ theme }) => ({
  top: 10,
  left: 'calc(-50% + 20px)',
  right: 'calc(50% + 20px)',
  '& .MuiStepConnector-line': {
    borderTopWidth: 2,
    borderColor: theme.palette.divider,
  },
  '&.Mui-active, &.Mui-completed': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

// ----------------------------------------------------------------------

interface Props extends StepperProps {
  steps: string[];
  activeStep: number;
}

export default function CheckoutSteps({ steps, activeStep, sx, ...other }: Props) {
  return (
    <Stepper
      alternativeLabel
      activeStep={activeStep}
      connector={<StepConnector />}
      sx={{ mb: 5, ...sx }}
      {...other}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel
            StepIconComponent={StepIcon}
            sx={{
              '& .MuiStepLabel-label': {
                typography: 'subtitle2',
              },
            }}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

// ----------------------------------------------------------------------

type StepIconProps = {
  active: boolean;
  completed: boolean;
};

function StepIcon({ active, completed }: StepIconProps) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 24,
        height: 24,
        color: 'text.disabled',
        ...(active && {
          color: 'primary.main',
        }),
      }}
    >
      {completed ? (
        <Iconify icon="eva:checkmark-fill" sx={{ color: 'primary.main' }} />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
          }}
        />
      )}
    </Stack>
  );
}
