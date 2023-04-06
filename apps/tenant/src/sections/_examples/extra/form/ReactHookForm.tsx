import * as Yup from 'yup';
import { useRef, useEffect, useState } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import {
  Stack,
  Grid,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormHelperText,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
// utils
import { fTimestamp } from '../../../../utils/formatTime';
import { fData } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';
import FormProvider, {
  RHFEditor,
  RHFCheckbox,
  RHFTextField,
} from '../../../../components/hook-form';

// ----------------------------------------------------------------------

const MAX_FILE_SIZE = 2 * 1000 * 1000; // 2 Mb

const FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

export type FormValuesProps = {
  fullName: string;
  email: string;
  age: string | number;
  startDate: Date | null;
  endDate: Date | null;
  password: string;
  confirmPassword: string;
  editor: string;
  photo: File | null | undefined;
  terms: boolean;
};

export const defaultValues = {
  fullName: '',
  email: '',
  age: '',
  startDate: null,
  endDate: null,
  password: '',
  confirmPassword: '',
  editor: '',
  photo: null,
  terms: false,
};

export const FormSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full name is required')
    .min(8, 'Mininum 6 characters')
    .max(24, 'Maximum 15 characters'),
  email: Yup.string().required('Email is required').email('That is not an email'),
  age: Yup.number()
    .required('Age is required')
    .positive('Age must be a positive number')
    .integer()
    .moreThan(18, 'Age must be greater than or equal to 18')
    .lessThan(120, 'Age must be less than or equal to 120'),
  startDate: Yup.date().nullable().required('Start date is required'),
  endDate: Yup.date()
    .required('End date is required')
    .nullable()
    .min(Yup.ref('startDate'), 'End date must be later than start date'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password should be of minimum 6 characters length'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], "Password's not match"),
  editor: Yup.string().required('Editor is required'),
  terms: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
  photo: Yup.mixed()
    .required('Photo is is required')
    .test('fileSize', 'The file is too large', (file) => file && file.size <= MAX_FILE_SIZE)
    .test('fileFormat', 'Unsupported Format', (file) => file && FILE_FORMATS.includes(file.type)),
});

export default function ReactHookForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm<FormValuesProps>({
    mode: 'onTouched',
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    control,
    register,
    setValue,
    resetField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (values.editor === '<p><br></p>') {
      resetField('editor');
    }
  }, [resetField, values.editor]);

  const handleClickAttachPhoto = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: FormValuesProps) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    alert(
      JSON.stringify(
        {
          ...data,
          photo: data.photo,
          startDate: data.startDate && fTimestamp(data.startDate),
          endDate: data.endDate && fTimestamp(data.endDate),
        },
        null,
        2
      )
    );

    reset();
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <RHFTextField name="fullName" label="Full Name" />

            <RHFTextField name="email" label="Email address" />

            <RHFTextField name="age" label="Age" />

            <Stack spacing={{ xs: 2, sm: 3 }} direction={{ xs: 'column', sm: 'row' }}>
              <Controller
                name="startDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    {...field}
                    label="Start date"
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />

              <Controller
                name="endDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    {...field}
                    label="End date"
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />
            </Stack>

            <RHFTextField
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <RHFTextField
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <RHFEditor name="editor" />

            <div>
              <Stack direction="row" alignItems="center" spacing={3}>
                <Button
                  color="warning"
                  variant="contained"
                  onClick={handleClickAttachPhoto}
                  startIcon={<Iconify icon="eva:cloud-upload-fill" />}
                >
                  Upload photo
                </Button>

                <div>
                  {values.photo?.name && (
                    <Typography variant="subtitle2">{values.photo.name}</Typography>
                  )}
                  {values.photo?.size && (
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {fData(values.photo.size)}
                    </Typography>
                  )}
                </div>

                <input
                  {...register('photo')}
                  ref={fileInputRef}
                  type="file"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    setValue('photo', file);
                  }}
                  style={{ display: 'none' }}
                />
              </Stack>

              {!!errors?.photo && (
                <FormHelperText sx={{ px: 2, display: 'block' }} error>
                  {errors?.photo?.message}
                </FormHelperText>
              )}
            </div>

            <div>
              <RHFCheckbox name="terms" label=" Terms and Conditions" />

              {errors.terms && (
                <FormHelperText sx={{ px: 2 }} error>
                  {errors.terms.message}
                </FormHelperText>
              )}
            </div>

            <LoadingButton
              fullWidth
              color="info"
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Submit
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
