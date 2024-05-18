import { FC, useRef } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { AppState, Provider, ActionTypes } from '../../types'
import groupBy from 'lodash/groupBy'

import Typography from '@mui/material/Typography'
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

type ProviderConfirmProps = {
  provider: Provider,
  confirmProviderForm: () => void
}

const ProviderConfirm: FC<ProviderConfirmProps> = ({
  provider,
  confirmProviderForm,
}) => {
  const providerRef = useRef<Provider>(provider)

  const providerFirstName = providerRef.current.name.split(' ')[0]
  const groupedAvails = groupBy(providerRef.current.availability, 'day')

  return (
    <>
       <Typography variant="h4" sx={{ ml: 1, mb: 1 }}>
          Thanks, {providerFirstName}
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ ml: 1, mb: 3 }}>
        Here's what we got, does it look right?
      </Typography>
      <Stack spacing={2}>
        {Object.entries(groupedAvails).map(([day, times]) => (
          <div>
            <Typography variant="h6" sx={{ fontWeight: 'bold', ml: 1 }}>
              {day}
            </Typography>
            {times.map(time => (
              <Typography variant="body1" sx={{ ml: 1 }}>
                {time.startTime} - {time.endTime}
              </Typography>
            ))}
          </div>
        ))}
      </Stack>
      <Paper sx={{ mx: 1, mt: 3, position: 'fixed', bottom: 75, left: 0, right: 0 }} elevation={3}>
        <Box>
          <Button 
            variant="contained" 
            color="error" 
            sx={{ width: '100%' }}
            onClick={() => {
              // This is where we'd make the api request to save the provider avails to the API

              // Then mark the form as done to show the success screen
              confirmProviderForm()
            }}>
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