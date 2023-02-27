// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types Imports
import { CardStatsVerticalProps } from 'src/@core/components/card-statistics/types'

const CardStatsVertical = (props: CardStatsVerticalProps) => {
  // ** Props
  const { title, color, icon, stats, chipText, trendNumber, trend = 'positive' } = props

  return (
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 6, width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <CustomAvatar skin='light' variant='rounded' color={color}>
            {icon}
          </CustomAvatar>
          <Box
            sx={{ display: 'flex', alignItems: 'center', color: trend === 'positive' ? 'success.main' : 'error.main' }}
          >
            <Typography variant='subtitle2' sx={{ color: trend === 'positive' ? 'success.main' : 'error.main' }}>
              {trendNumber}
            </Typography>
            <Icon icon={trend === 'positive' ? 'mdi:chevron-up' : 'mdi:chevron-down'} fontSize='1.25rem' />
          </Box>
        </Box>
        <Typography variant='h6' sx={{ mb: 1 }}>
          {stats}
        </Typography>
        <Typography variant='body2' sx={{ mb: 5 }}>
          {title}
        </Typography>
        <CustomChip
          skin='light'
          size='small'
          label={chipText}
          color='secondary'
          sx={{ height: 20, fontWeight: 500, fontSize: '0.75rem', alignSelf: 'flex-start', color: 'text.secondary' }}
        />
      </CardContent>
    </Card>
  )
}

export default CardStatsVertical
