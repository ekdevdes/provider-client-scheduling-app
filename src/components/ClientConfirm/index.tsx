import { FC, useRef } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { AppState, Client, ActionTypes, ClientForm } from '../../types'
import groupBy from 'lodash/groupBy'

import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Button from '@mui/material/Button'

import Confirm from '../shared/Confirm'

type ClientConfirmProps = {
  client: Client
  clientForm: ClientForm
  confirmClientForm: () => void
}

const ClientConfirm: FC<ClientConfirmProps> = ({
  client,
  clientForm,
  confirmClientForm,
}) => {
  const clientRef = useRef<Client>(client)

  const clientFirstName = clientRef.current.name.split(' ')[0]
  const groupedAvails = groupBy([clientForm.selectedAvail], 'day')

  return (
    <>
      <Confirm 
        name={clientFirstName} 
        desc={`Here's the details for your appointment with ${clientForm.provider.name}, does it look right?`}
        avails={groupedAvails}
        showCountdown /> 
      <Paper sx={{ mx: 1, mt: 3, position: 'fixed', bottom: 75, left: 0, right: 0 }} elevation={3}>
        <Box>
          <Button 
            variant="contained" 
            color="error" 
            sx={{ width: '100%' }}
            onClick={() => {
              // This is where we'd make the api request to save the client avails to the API, associating them with the provider they just selected

              // Then mark the form as done to show the success screen
              confirmClientForm()
            }}>
            Done
          </Button>
        </Box>
      </Paper>
    </>
  )
}

const mapStateToProps = (state: AppState) => {
  const LOGGED_IN_CLIENT_ID = 1
  
  return {
    client: state.clients.find(provider => provider.id === LOGGED_IN_CLIENT_ID),
    clientForm: state.clientForm
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  confirmClientForm: () => dispatch({
    type: ActionTypes.UPDATE_CLIENT_IS_CONFIRMING
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(ClientConfirm)