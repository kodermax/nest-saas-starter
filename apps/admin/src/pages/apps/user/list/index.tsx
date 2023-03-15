// ** React Imports
import { useState, useCallback } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Utils Import

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'
import { getUsers } from 'src/@core/services/users.service'
import CustomStore from 'devextreme/data/custom_store'
import DataGrid, { Column, Pager, Paging } from 'devextreme-react/data-grid'
import { User } from 'src/@core/services/user.types'

const UserList = () => {
  // ** State
  const [role, setRole] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const store = new CustomStore({
    key: 'id',
    async load(loadOptions) {
      console.log(loadOptions)
      try {
        const users = await getUsers()

        return {
          data: users.data.data,
          totalCount: users.data.totalCount
        }
      } catch {
        throw new Error('Data Loading Error')
      }
    }
  })

  const allowedPageSizes = [8, 12, 20]

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handleRoleChange = useCallback((e: SelectChangeEvent) => {
    setRole(e.target.value)
  }, [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  const calculateFullName = (data: User) => {
    return [data.firstName, data.lastName].join(' ')
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='role-select'>Select Role</InputLabel>
                  <Select
                    fullWidth
                    value={role}
                    id='select-role'
                    label='Select Role'
                    labelId='role-select'
                    onChange={handleRoleChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    <MenuItem value=''>Select Role</MenuItem>
                    <MenuItem value='admin'>Admin</MenuItem>
                    <MenuItem value='user'>User</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          <DataGrid dataSource={store} showBorders={true} remoteOperations={true}>
            <Column dataField='id' dataType='string' />
            <Column calculateCellValue={calculateFullName} dataType='string' caption='Full Name' />
            <Column dataField='email' dataType='string' />
            <Column dataField='roles' dataType='string' />
            <Paging defaultPageSize={12} />
            <Pager showPageSizeSelector={true} allowedPageSizes={allowedPageSizes} />
          </DataGrid>
        </Card>
      </Grid>

      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  )
}
UserList.acl = {
  action: 'manage',
  subject: 'all'
}
export default UserList
