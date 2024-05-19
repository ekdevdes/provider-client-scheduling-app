// Libs
import { FC, useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import isEmpty from 'lodash/isEmpty'
import { AppState, Provider, Availability, ActionTypes } from '../../types'

// Helpers
import getAvailDays from '../../utils/getAvailDays'
import getAvailTimes from '../../utils/getAvailTimes'

// Material components
import Typography from '@mui/material/Typography'
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add';

// Internal components
import TimeSlot from './TimeSlot'

type ProviderFormProps = {
  provider: Provider
  updateProviderForm: (providerId: number, avails: Availability[]) => void
}

const ProviderForm: FC<ProviderFormProps> = ({ provider, updateProviderForm }) => {
  const START_OF_DAY = '8am'
  const END_OF_DAY = '8pm'

  // Helps keep track of how many time slots to show and the ultimate result of all the selections
  const [timeSlots, setTimeSlots] = useState<number>(1)
  const [avails, setAvails] = useState<Availability[]>([])

  // Refs ensure properties we're certain won't change often don't cause re-renders
  // Here we're just caching the return value of the calls to our helper functions above, similar to what `useMemo` can do
  const availDays = useRef<string[]>(getAvailDays(10))
  const availTimes = useRef<string[]>(getAvailTimes(START_OF_DAY, END_OF_DAY, 15))
  const providerRef = useRef<Provider>(provider)

  // It's weird to refer to people by the full name in a greeting :)
  const providerFirstName = providerRef.current.name.split(' ')[0]

  // If the provider has made some selections from the dropdowns lets save that to redux
  useEffect(() => {
    if (!isEmpty(avails)) {
      updateProviderForm(providerRef.current.id, avails)
    }
  }, [avails])

  // Handy little helper to generate as many time slot components as we need from our counter above
  const timeSlotComponents = Array.from({ length: timeSlots }, (_, i) => (
    <TimeSlot 
      key={i} 
      timeSlots={timeSlots} 
      availDays={availDays.current}
      availTimes={availTimes.current}
      avails={avails}
      setTimeSlots={setTimeSlots}
      setAvails={setAvails}
    />
  ));

  return (
    <>
      <Typography variant="h4" sx={{ ml: 1, mb: 1 }}>
        Hey {providerFirstName}, Enter Your Availability
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ ml: 1, mb: 3 }}>
        Let us know what you want your week to look like
      </Typography>
      <div>
        {timeSlotComponents}
      </div>
      <Paper sx={{ mx: 1, mt: 3, position: 'fixed', bottom: 75, left: 0, right: 0 }} elevation={3}>
        <Box>
          <Button 
            variant="contained" 
            color="error" 
            sx={{ width: '100%' }}
            onClick={() => {
              setTimeSlots(timeSlots + 1)
            }}
          >
            <AddIcon sx={{ mr: 1 }} />
            Add Availability
          </Button>
        </Box>
      </Paper>
    </>
  )
}

const mapStateToProps = (state: AppState) => {
  // In a prod app we'd likely get the signed in user id from a JWT or a `useAuth` hook but since this just a simple app we're hardcoding it
  const LOGGED_IN_PROVIDER_ID = 1
  
  return {
    provider: state.providers.find(provider => provider.id === LOGGED_IN_PROVIDER_ID)
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateProviderForm: (providerId: number, avails: Availability[]) => dispatch({
    type: ActionTypes.UPDATE_PROVIDER_FORM, 
    payload: {
      providerId,
      avails
    } 
  }),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProviderForm)