// Libs
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

// Helpers
import filterAvails from '../../utils/filterAvails'

// Material components
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

          // First lets remove any availability thats not 24 hours befor ethe current date
          // Then let's group the remainder by day and grab the first one so we can show a nice little 'First Available' text
          const firstDayAvail = Object.values(
            groupBy(filterAvails(provider.availability), 'day')
          )[0]

          // In a production app we could turn the starTime string to a luxon date object and sort by that to allow for more predictable sorting
          const firstTimeAvail = sortBy(firstDayAvail, 'startTime')[0]

          return (
            <Paper elevation={2} sx={{ mb: 2, display: 'flex', p: 2 }} key={provider.id}>
              {/* In a prod app we'd have the provider image, for now we're just using a placeholder image service */}
              <Avatar alt={provider.name} src="https://picsum.photos/seed/picsum/50/50" />
              <Typography variant="body1" sx={{ ml: 1 }}>
                {provider.name}

                {/* If the provider has availability in the next 24hrs+ show the first one else just show a "No Availability" text */}
                <Typography variant="body1" sx={{ fontSize: 'small' }}>
                    {hasAvails && !isEmpty(firstTimeAvail) ? (
                      <>
                        First Availability: <span style={{ fontWeight: 'bold' }}>{firstTimeAvail.day} at {firstTimeAvail.startTime}</span>
                      </>
                    ) : ( <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: 'small' }}>
                      No Availability
                    </Typography>)}
                  </Typography>
              </Typography>
              <Button 
                variant="outlined" 
                color="error" 
                size="small" 
                sx={{ ml: "auto" }}
                disabled={!hasAvails}
                onClick={() => {
                  setClientFormIsBooking(provider)
                }}
              >
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
  // In a prod app we'd likely get the signed in user id from a JWT or a `useAuth` hook but since this just a simple app we're hardcoding it
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