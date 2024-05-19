import { FC, useRef } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import { 
  AppState,
  Client, 
  ActionTypes,
  ClientForm,
  Availability
} from '../../types'

import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

type ClientBookingProps = {
  client: Client,
  clientForm: ClientForm
  setClientFormIsSubmitted: (selectedAvail: Availability) => void
}

const ClientBooking: FC<ClientBookingProps> = ({
  client,
  clientForm,
  setClientFormIsSubmitted
}) => {
  // Refs prevent unncessary re-renders
  const clientRef = useRef(client)
  const clientFirstName = clientRef.current.name.split(' ')[0]

  const days = groupBy(clientForm.provider.availability, 'day')

  return (
    <div>
      <Typography variant="h4" sx={{ ml: 1 }}>
        {clientFirstName}, Let's get you set up with {clientForm.provider.name}
      </Typography>
      <Typography variant="body1" sx={{ ml: 1, mb: 2 }}>
        Choose a 15 minute time slot from their availability below
      </Typography>
      <Box>
        {!isEmpty(days) ? Object.entries(days).map(([day, avail]) => (
          <Paper elevation={2} sx={{ mb: 2, display: 'flex', p: 2, flexDirection: 'column' }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ ml: 1 }}>
                {day}
              </Typography>
            </Box>
            <Box>
              {avail.map((a) => (
                <Button 
                  variant="outlined" 
                  color="error" 
                  size="small" 
                  sx={{ ml: 1 }}
                  onClick={() => setClientFormIsSubmitted(a)}>
                    {a.startTime}
                </Button>
              ))}
            </Box>
          </Paper>
        )) : null}
      </Box>
    </div>
  )
}

const mapStateToProps = (state: AppState) => {
  // Typically the client and provider apps would each be seperate and they'd each have the provider/client id on the payload from the JWT
  // For this app we're just going to hard code it
  const LOGGED_IN_CLIENT_ID = 1

  return {
    client: state.clients.find(client => client.id === LOGGED_IN_CLIENT_ID),
    clientForm: state.clientForm
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setClientFormIsSubmitted: (selectedAvail: Availability) => dispatch({
    type: ActionTypes.UPDATE_CLIENT_IS_SUBMITTING,
    payload: {
      selectedAvail
    }
  }),
})

export default connect(mapStateToProps, mapDispatchToProps)(ClientBooking)