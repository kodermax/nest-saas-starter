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
import { AxiosError } from 'axios'

// components

// ----------------------------------------------------------------------

type FormValuesProps = {
  domain: string
}

const ResetPasswordSchema = Yup.object().shape({
  domain: Yup.string()
    .test('checkAvailabilty', 'Сайт с таким URL-адресом уже существует', async (value: any) => {
      try {
        const {
          data: { status }
        } = await checkAvailability(value)
      
        return status === 'available'
      }
      catch(e) {
      }
      
      return false;
    })
    .required('Поле обязательно для заполнения')
})

export default function RegisterForm() {
  const { push } = useRouter()

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver<any>(ResetPasswordSchema),
    defaultValues: { domain: '' },
    mode: 'onBlur'
  })

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting }
  } = methods

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await createTenant(data)
      push('/register/account')
    } catch (err) {
        setError('domain', { type: 'custom', message: err === undefined || (err as AxiosError)?.status === 400 ? 'Сервис не доступен': 'Сайт с таким URL-адресом уже существует'})  
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField
        color='success'
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
