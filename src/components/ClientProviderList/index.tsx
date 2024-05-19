import { FC, useRef } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { 
  AppState, 
  Provider, 
  Client, 
  ActionTypes
} from '../../types'
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import isEmpty from 'lodash/isEmpty'

import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

type ClientProviderListProps = {
  providers: Provider[]
  client: Client,
  setClientFormIsBooking: (provider: Provider) => void
}

const ClientProviderList: FC<ClientProviderListProps> = ({
  client,
  providers,
  setClientFormIsBooking
}) => {
  // Refs prevent unncessary re-renders
  const clientRef = useRef(client)
  const clientFirstName = clientRef.current.name.split(' ')[0]

  return (
    <div>
      <Typography variant="h4" sx={{ ml: 1, mb: 1 }}>
        Hey {clientFirstName}, what ails you today?
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ ml: 1, mb: 3 }}>
        Take a look at the available providers below and we can get you a time booked to fix it
      </Typography>
      <Box>
        {providers.map(provider => {
          const hasAvails = provider.availability.length
          const firstDayAvail = Object.values(groupBy(provider.availability, 'day'))[0]

          // An improvement to make here would be turning the start time to a js date object using luxon for more predicatable sorting
          const firstTimeAvail = sortBy(firstDayAvail, 'startTime')[0]

          return (
            <Paper elevation={2} sx={{ mb: 2, display: 'flex', p: 2 }} key={provider.id}>
              {/* Just getting images from a random image placeholder service for now */}
              <Avatar alt={provider.name} src="https://picsum.photos/seed/picsum/50/50" />
              <Typography variant="body1" sx={{ ml: 1 }}>
                {provider.name}
                {hasAvails && !isEmpty(firstTimeAvail) ? (
                  <Typography variant="subtitle1" sx={{ fontSize: 'small' }}>
                    First Availability: <span style={{ fontWeight: 'bold' }}>{firstTimeAvail.day} at {firstTimeAvail.startTime}</span>
                  </Typography>
                ) : null}
              </Typography>
              <Button 
                variant="outlined" 
                color="error" 
                size="small" 
                sx={{ ml: "auto" }}
                onClick={() => {
                  setClientFormIsBooking(provider)
                }}>
                  Book
              </Button>
            </Paper>
          )
        })}
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
    providers: state.providers
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setClientFormIsBooking: (provider: Provider) => dispatch({
    type: ActionTypes.UPDATE_CLIENT_IS_BOOKING,
    payload: {
      provider
    }
  }),
})

export default connect(mapStateToProps, mapDispatchToProps)(ClientProviderList)