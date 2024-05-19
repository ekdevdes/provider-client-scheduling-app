// Libs
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

// Material components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import filterAvails from '../../utils/filterAvails'

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
  const clientRef = useRef(client)
  const clientFirstName = clientRef.current.name.split(' ')[0]

  // First remove any provider availability that falls within a <24 hr window
  // Then group the remaining by day so we can have a "card" for each day with buttons for each available time
  const days = groupBy(filterAvails(clientForm.provider.availability), 'day')

  return (
    <div>
      <Typography variant="h4" sx={{ ml: 1 }}>
        {clientFirstName}, Let's get you set up with {clientForm.provider.name}
      </Typography>
      <Typography variant="body1" sx={{ ml: 1, mb: 2 }}>
        Choose a 15 minute time slot from their availability below
      </Typography>
      <Box>
        {/* Essentially we'll have one "card" for each day with buttons for each available time in the next 24hr+ time window */}
        {!isEmpty(days) ? Object.entries(days).map(([day, avail], i) => (
          <Paper elevation={2} sx={{ mb: 2, display: 'flex', p: 2, flexDirection: 'column' }} key={`booking-day-${i}`}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ ml: 1 }}>
                {day}
              </Typography>
            </Box>
            <Box>
              {avail.map((a, j) => (
                <Button 
                  key={`booking-confirm-time-${i}-${j}`}
                  variant="outlined" 
                  color="error" 
                  size="small" 
                  sx={{ ml: 1 }}
                  onClick={() => setClientFormIsSubmitted(a)}
                >
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
  // In a prod app we'd likely get the signed in user id from a JWT or a `useAuth` hook but since this just a simple app we're hardcoding it
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