import { FC, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { Availability, ActionTypes } from '../../../types'
import { Duration } from 'luxon'
import isEmpty from 'lodash/isEmpty'

import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'

type ConfirmProps = {
  name: string
  desc: string
  avails: Record<string, Availability[]>
  showCountdown?: boolean
  clearClientForm: () => void
}

const Confirm: FC<ConfirmProps> = ({
  name,
  desc,
  avails,
  showCountdown = false,
  clearClientForm
}) => {
  const MAX_EXP_DURATION = 30
  const [expDuration, setExpDuration] = useState<Duration|null>(
    Duration.fromObject({ minutes: MAX_EXP_DURATION })
    // Duration.fromObject({ seconds: 5 }) // enable for testing
  )

  useEffect(() => {
    let interval = 0

    if (showCountdown && !isEmpty(expDuration)) {
      interval = setInterval(() => {
        setExpDuration(expDuration.minus({ seconds: 1 }))
    
        // Check if the timer has reached zero
        if (expDuration.as('seconds') <= 0) {
            clearInterval(interval);
            setExpDuration(null)
            clearClientForm()
        }
      }, 1000);
    }

    // Cleanup the interval when the effect unmounts
    if (isEmpty(interval)) {
      return () => clearInterval(interval)
    }
  }, [showCountdown, expDuration])

  return (
    <>
      {showCountdown && !isEmpty(expDuration) ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          <span style={{ fontWeight: 'bold' }}>Head Up!</span> This appointment will expire in&nbsp;
            <span style={{ fontWeight: 'bold'}}>
              {/* {expDuration.toFormat('mm minutes and ss seconds'))} */}
              {expDuration.toFormat('mm:ss')} seconds
            </span> if not confirmed now
        </Alert>
      ) : null}
      <Typography variant="h4" sx={{ ml: 1, mb: 1 }}>
          Thanks, {name}
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ ml: 1, mb: 3 }}>
        {desc}
      </Typography>
      <Stack spacing={2}>
        {Object.entries(avails).map(([day, times], i) => (
          <Paper elevation={2} key={`confirm-day-${i}`}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', m: 2, mb: 0 }}>
              {day}
            </Typography>
            <Box sx={{ m: 2, mt: 1 }}>
              {times.map((time, j) => (
                <Typography variant="body1" key={`confirm-${i}-${j}`}>
                  {time.startTime} - {time.endTime}
                </Typography>
              ))}
            </Box>
          </Paper>
        ))}
      </Stack>
    </>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearClientForm: () => dispatch({
    type: ActionTypes.CLEAR_CLIENT_FORM
  })
})

export default connect(null, mapDispatchToProps)(Confirm)