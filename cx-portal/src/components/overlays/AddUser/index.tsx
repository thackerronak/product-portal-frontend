import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
  Tab,
  Tabs,
  TabPanel,
} from 'cx-portal-shared-components'
import { UserRoles } from './UserRoles'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import {
  rolesToAddSelector,
  usersToAddSelector,
} from 'features/admin/userDeprecated/slice'
import { useDispatch, useSelector } from 'react-redux'
import { show } from 'features/control/overlay/actions'
import { OVERLAYS } from 'types/Constants'
import './AddUserOverlay.scss'
import { MultipleUserContent } from './MultipleUserContent'
import { SingleUserContent } from './SingleUserContent'
import { useAddTenantUsersMutation } from 'features/admin/userApiSlice'

export const AddUser = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const usersToAdd = useSelector(usersToAddSelector)
  const rolesToAdd = useSelector(rolesToAddSelector)
  const [addTenantUsers] = useAddTenantUsersMutation()
  const [activeTab, setActiveTab] = useState(0)

  const handleConfirm = async () => {
    const addUser = { ...usersToAdd, roles: rolesToAdd }
    console.log(addUser)
    try {
      const result = await addTenantUsers([addUser]).unwrap()
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }

  const handleTabSwitch = (
    _event: React.ChangeEvent<unknown>,
    newValue: number
  ) => {
    setActiveTab(newValue)
  }

  return (
    <>
      <DialogHeader
        {...{
          title: t('content.addUser.headline'),
          intro: t('content.addUser.subheadline'),
          closeWithIcon: true,
          onCloseWithIcon: () => dispatch(show(OVERLAYS.NONE)),
        }}
      />

      <DialogContent className="w-100">
        <Tabs
          value={activeTab}
          onChange={handleTabSwitch}
          aria-label="basic tabs usage"
        >
          <Tab
            sx={{ minWidth: '50%' }}
            label={t('content.addUser.singleUser')}
            icon={<PersonOutlinedIcon />}
            iconPosition="start"
          />
          <Tab
            sx={{ minWidth: '50%' }}
            label={t('content.addUser.multipleUser')}
            icon={<GroupOutlinedIcon />}
            iconPosition="start"
          />
        </Tabs>
        <TabPanel value={activeTab} index={0}>
          <SingleUserContent />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <MultipleUserContent />
        </TabPanel>
        <UserRoles />
      </DialogContent>

      <DialogActions helperText={t('content.addUser.helperText')}>
        <Button
          variant="outlined"
          onClick={() => dispatch(show(OVERLAYS.NONE))}
        >
          {t('global.actions.cancel')}
        </Button>
        <Button
          variant="contained"
          disabled={usersToAdd.email ? false : true}
          onClick={handleConfirm}
        >
          {t('global.actions.confirm')}
        </Button>
      </DialogActions>
    </>
  )
}
