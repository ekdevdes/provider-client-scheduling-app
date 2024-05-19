import { FC } from 'react'

import Typography from '@mui/material/Typography'
import Box from "@mui/material/Box"
import CheckIcon from '@mui/icons-material/Check'

type DoneProps = {
  name: string,
  desc: string
}

const Done: FC<DoneProps> = ({
  name,
  desc
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mt: '50%' }}>
      <CheckIcon sx={{ fontSize: '4rem', color: 'error.main' }} />
      <Typography variant="h4" sx={{ ml: 1, mb: 1 }}>
          Thanks, {name}
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ ml: 1, mb: 3, textAlign: 'center' }}>
        {desc}
      </Typography>
    </Box>
  )
}

export default Done