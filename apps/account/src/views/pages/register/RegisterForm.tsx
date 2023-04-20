import * as Yup from 'yup'

// next
import { useRouter } from 'next/router'

// form
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

// @mui
import { LoadingButton } from '@mui/lab'
import FormProvider, { RHFTextField } from '../../../components/hook-form'

// components

// ----------------------------------------------------------------------

type FormValuesProps = {
  domain: string
}

export default function RegisterForm() {
  const { push } = useRouter()

  const ResetPasswordSchema = Yup.object().shape({
    domain: Yup.string().required('Поле обязательно для заполнения')
  })

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { domain: '' }
  })

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = methods

  const onSubmit = async (data: FormValuesProps) => {
    try {
      console.log(data)
      await new Promise(resolve => setTimeout(resolve, 500))

      push('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name='domain' label='Адрес сайта' />

      <LoadingButton fullWidth size='large' type='submit' variant='contained' loading={isSubmitting} sx={{ mt: 3 }}>
        Продолжить
      </LoadingButton>
    </FormProvider>
  )
}
