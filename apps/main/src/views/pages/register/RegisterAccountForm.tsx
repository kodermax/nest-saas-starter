import * as yup from 'yup'

// next
import { useRouter } from 'next/router'

// form
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

// @mui
import { LoadingButton } from '@mui/lab'
import FormProvider, { RHFTextField } from '../../../components/hook-form'
import { createAccount } from 'src/@core/services/accounts.service'

// components

// ----------------------------------------------------------------------
const ResetPasswordSchema = yup
  .object()
  .shape({
    email: yup.string().email('Не правильный Email').required('Поле обязательно для заполнения'),
    password: yup
      .string()
      .min(6, 'Пароль должен содержать минимум 6 символов')
      .required('Поле обязательно для заполнения')
  })
  .required()

type FormValuesProps = {
  email: string
  password: string
}

export default function RegisterAccountForm() {
  const { push } = useRouter()

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver<any>(ResetPasswordSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onBlur'
  })

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = methods

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await createAccount(data)
      push('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name='email' label='Email' sx={{ mb: 3 }} />
      <RHFTextField name='password' label='Пароль' />
      <LoadingButton fullWidth size='large' type='submit' variant='contained' loading={isSubmitting} sx={{ mt: 3 }}>
        Продолжить
      </LoadingButton>
    </FormProvider>
  )
}
