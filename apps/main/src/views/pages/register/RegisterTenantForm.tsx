import * as Yup from 'yup'

// next
import { useRouter } from 'next/router'

// form
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

// @mui
import { LoadingButton } from '@mui/lab'
import FormProvider, { RHFTextField } from '../../../components/hook-form'
import { InputAdornment, Typography } from '@mui/material'
import { checkAvailability, createTenant } from 'src/@core/services/tenants.service'

// components

// ----------------------------------------------------------------------
const ResetPasswordSchema: any = Yup.object().shape({
  name: Yup.string().required('Поле обязательно для заполнения'),
  domain: Yup.string()
    .test('checkAvailabilty', 'Сайт с таким URL-адресом уже существует', async (value: any) => {
      const {
        data: { status }
      } = await checkAvailability(value)

      return status === 'available'
    })
    .required('Поле обязательно для заполнения')
})

type FormValuesProps = {
  name: string
  domain: string
}

export default function RegisterTenantForm() {
  const { push } = useRouter()

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ResetPasswordSchema),
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
      <RHFTextField name='name' label='Название сайта' sx={{ mb: 3 }} />
      <RHFTextField
        name='domain'
        label='Адрес сайта'
        InputProps={{
          endAdornment: <InputAdornment position='end'>.vercel.app</InputAdornment>
        }}
      />
      <Typography component='div' sx={{ color: 'text.secondary', mt: 3, typography: 'caption', textAlign: 'left' }}>
        Это временный URL-адрес для начала настройки вашего сайта. Как только вы настроите свой сайт, вы можете оставить
        его как есть или заменить пользовательским доменным именем.
      </Typography>
      <LoadingButton fullWidth size='large' type='submit' variant='contained' loading={isSubmitting} sx={{ mt: 3 }}>
        Продолжить
      </LoadingButton>
    </FormProvider>
  )
}
