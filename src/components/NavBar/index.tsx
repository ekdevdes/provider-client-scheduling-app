// Libs
import { FC } from 'react'
import { connect } from "react-redux"
import { Dispatch } from '@reduxjs/toolkit'
import { AppState, ActionTypes, Availability, ProviderForm } from '../../types'

// Material components
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TodayIcon from '@mui/icons-material/Today'
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

type NavBarProps = {
  activeTabIndex: number
  providerForm: ProviderForm
  updateProviderAvails: (providerId: number, avails: Availability[]) => void
}

const NavBar: FC<NavBarProps> = ({ activeTabIndex, providerForm, updateProviderAvails }) => {
  const isProviderTabActive = activeTabIndex === 0
  const notProviderFormSubmitted = !providerForm.submitted && !providerForm.confirmed

  const navBarIcon = isProviderTabActive ?
   <TodayIcon sx={{ mr: 1 }} /> : 
   <PersonSearchIcon sx={{ mr: 1 }} />

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: 'error.main'}}>
        <Toolbar>
          {navBarIcon}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
          >
            { isProviderTabActive ? 'Schedule' : 'Appointment Lookup' }
          </Typography>
          {isProviderTabActive && notProviderFormSubmitted && (
            <Button sx={{ color: 'white' }} onClick={() => {
              updateProviderAvails(providerForm.providerId || 0, providerForm.avails)
            }}>
                Update
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    activeTabIndex: state.activeTabIndex,
    providerForm: state.providerForm
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateProviderAvails: (providerId: number, avails: Availability[]) => dispatch({
    type: ActionTypes.UPDATE_PROVIDER_AVAIL, 
    payload: {
      providerId,
      avails
    } 
  }),
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)