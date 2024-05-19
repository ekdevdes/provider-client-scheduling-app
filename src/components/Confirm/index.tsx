import { FC } from 'react'
import { Availability } from '../../types'

import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

type ConfirmProps = {
  name: string,
  avails: Record<string, Availability[]>
}

const Confirm: FC<ConfirmProps> = ({
  name,
  avails
}) => {
  return (
    <>
      <Typography variant="h4" sx={{ ml: 1, mb: 1 }}>
          Thanks, {name}
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ ml: 1, mb: 3 }}>
        Here's what we got, does it look right?
      </Typography>
      <Stack spacing={2}>
        {Object.entries(avails).map(([day, times]) => (
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
    </>
  )
}

export default Confirm