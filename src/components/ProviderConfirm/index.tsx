// Libs
import { FC, useRef } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { AppState, Provider, ActionTypes } from '../../types'
import groupBy from 'lodash/groupBy'

// Material components
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Button from '@mui/material/Button'

// Internal components
import Confirm from '../shared/Confirm'

type ProviderConfirmProps = {
  provider: Provider,
  confirmProviderForm: () => void
}

const ProviderConfirm: FC<ProviderConfirmProps> = ({
  provider,
  confirmProviderForm,
}) => {
  // Refs help us prevent unncessary re-renders for info that doesn't change often
  const providerRef = useRef<Provider>(provider)
  const providerFirstName = providerRef.current.name.split(' ')[0]

  // First, let's group their selected availability by day for a nicer output
  const groupedAvails = groupBy(providerRef.current.availability, 'day')

  return (
    <>
      <Confirm 
        name={providerFirstName}
        desc={`Here's what we got, does it look right?`}
        avails={groupedAvails} /> 
      <Paper sx={{ mx: 1, mt: 3, position: 'fixed', bottom: 75, left: 0, right: 0 }} elevation={3}>
        <Box>
          <Button 
            variant="contained" 
            color="error" 
            sx={{ width: '100%' }}
            onClick={() => {
              // This is where we'd make the API request to save the provider availability to the API

              // Then mark the form as done to show the success screen
              confirmProviderForm()
            }}
          >
            Done
          </Button>
        </Box>
      </Paper>
    </>
  )
}

const mapStateToProps = (state: AppState) => {
  const LOGGED_IN_PROVIDER_ID = 1
  
  return {
    provider: state.providers.find(provider => provider.id === LOGGED_IN_PROVIDER_ID)
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  confirmProviderForm: () => dispatch({
    type: ActionTypes.CONFIRM_PROVIDER_FORM
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(ProviderConfirm)