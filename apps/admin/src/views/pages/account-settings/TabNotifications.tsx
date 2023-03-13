// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TableContainer from '@mui/material/TableContainer'

interface TableDataType {
  type: string
  app: boolean
  email: boolean
  browser: boolean
}

const data: TableDataType[] = [
  {
    app: true,
    email: true,
    browser: true,
    type: 'New for you'
  },
  {
    app: true,
    email: true,
    browser: true,
    type: 'Account activity'
  },
  {
    app: false,
    email: true,
    browser: true,
    type: 'A new browser used to sign in'
  },
  {
    app: false,
    email: true,
    browser: false,
    type: 'A new device is linked'
  }
]

const TabNotifications = () => {
  return (
    <Card>
      <CardHeader title='Recent Devices' />
      <CardContent>
        <Typography sx={{ color: 'text.secondary' }}>
          We need permission from your browser to show notifications. <strong>Request Permission</strong>
        </Typography>
      </CardContent>

      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>✉️ Email</TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>🖥 Browser</TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>👩🏻‍💻 App</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.type}>
                <TableCell>
                  <Typography sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>{row.type}</Typography>
                </TableCell>
                <TableCell>
                  <Checkbox defaultChecked={row.email} />
                </TableCell>
                <TableCell>
                  <Checkbox defaultChecked={row.browser} />
                </TableCell>
                <TableCell>
                  <Checkbox defaultChecked={row.app} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CardContent>
        <Typography sx={{ mb: 4, fontWeight: 500 }}>When should we send you notifications?</Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={4}>
            <Select fullWidth size='small' defaultValue='online'>
              <MenuItem value='online'>Only when I'm online</MenuItem>
              <MenuItem value='anytime'>Anytime</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' sx={{ mr: 3 }}>
              Save Changes
            </Button>
            <Button variant='outlined' color='secondary'>
              Discard
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default TabNotifications
