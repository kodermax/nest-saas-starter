import * as Yup from 'yup'

// next
import { useRouter } from 'next/router'

// form
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

// @mui
import { LoadingButton } from '@mui/lab'
import FormProvider, { RHFTextField } from '../../../components/hook-form'
import { InputAdornment } from '@mui/material'

// components

// ----------------------------------------------------------------------

type FormValuesProps = {
  name: string
  domain: string
}

export default function RegisterForm() {
  const { push } = useRouter()

  const ResetPasswordSchema = Yup.object().shape({
    name: Yup.string().required('Поле обязательно для заполнения'),
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
      <RHFTextField name='name' label='Название сайта' sx={{ mb: 3 }} />
      <RHFTextField
        name='domain'
        label='Адрес сайта'
        InputProps={{
          endAdornment: <InputAdornment position='end'>.nest-saas.io</InputAdornment>
        }}
      />

      <LoadingButton fullWidth size='large' type='submit' variant='contained' loading={isSubmitting} sx={{ mt: 3 }}>
        Продолжить
      </LoadingButton>
    </FormProvider>
  )
}
