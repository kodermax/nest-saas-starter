import * as yup from 'yup'

// next
import { useRouter } from 'next/router'

// form
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

// @mui
import { LoadingButton } from '@mui/lab'
import FormProvider, { RHFTextField } from '../../../components/hook-form'
import { checkAvailability, createTenant } from 'src/@core/services/tenants.service'

// components

// ----------------------------------------------------------------------
const ResetPasswordSchema = yup
  .object()
  .shape({
    email: yup.string().required('Поле обязательно для заполнения'),
    password: yup
      .string()
      .min(6, 'Пароль должен содержать минимум 6 символов')
      .required('Поле обязательно для заполнения')
  })
  .required()

type FormValuesProps = {
  name: string
  domain: string
}

export default function RegisterAccountForm() {
  const { push } = useRouter()

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver<any>(ResetPasswordSchema),
    defaultValues: { domain: '', name: '' },
    mode: 'onBlur'
  })

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = methods

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await createTenant(data)
      push('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name='Email' label='Email' sx={{ mb: 3 }} />
      <RHFTextField name='password' label='Пароль' />
      <LoadingButton fullWidth size='large' type='submit' variant='contained' loading={isSubmitting} sx={{ mt: 3 }}>
        Продолжить
      </LoadingButton>
    </FormProvider>
  )
}
