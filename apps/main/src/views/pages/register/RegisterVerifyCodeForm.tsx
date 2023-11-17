import * as Yup from 'yup'

// next
import { useRouter } from 'next/router'

// form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// @mui
import { Stack, FormHelperText } from '@mui/material'
import { LoadingButton } from '@mui/lab'

// components
import { useSnackbar } from '../../../components/snackbar'
import FormProvider, { RHFCodes } from '../../../components/hook-form'
import { verifyEmailCode } from 'src/@core/services/accounts.service'

// ----------------------------------------------------------------------

type FormValuesProps = {
  code1: string
  code2: string
  code3: string
  code4: string
}

export default function RegisterVerifyCodeForm() {
  const { push } = useRouter()

  const { enqueueSnackbar } = useSnackbar()

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required('Обязательное поле'),
    code2: Yup.string().required('Обязательное поле'),
    code3: Yup.string().required('Обязательное поле'),
    code4: Yup.string().required('Обязательное поле')
  })

  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: ''
  }

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<any>(VerifyCodeSchema),
    defaultValues
  })

  const {
    handleSubmit,
    formState: { isSubmitting, errors }
  } = methods

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await verifyEmailCode(Object.values(data).join(''))
      enqueueSnackbar('Verify success!')
      push('/register/ready')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFCodes keyName='code' inputs={['code1', 'code2', 'code3', 'code4']} />

        {(!!errors.code1 || !!errors.code2 || !!errors.code3 || !!errors.code4) && (
          <FormHelperText error sx={{ px: 2 }}>
            Обязательное поле
          </FormHelperText>
        )}

        <LoadingButton fullWidth size='large' type='submit' variant='contained' loading={isSubmitting} sx={{ mt: 3 }}>
          Продолжить
        </LoadingButton>
      </Stack>
    </FormProvider>
  )
}
