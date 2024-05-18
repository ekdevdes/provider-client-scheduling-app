import { FC, useRef } from 'react'
import { connect } from 'react-redux'
import { AppState, Provider } from '../../types'

import Typography from '@mui/material/Typography'
import Box from "@mui/material/Box"
import CheckIcon from '@mui/icons-material/Check';

type ProviderDoneProps = {
  provider: Provider
}

const ProviderDone: FC<ProviderDoneProps> = ({
  provider
}) => {
  const providerRef = useRef<Provider>(provider)

  const providerFirstName = providerRef.current.name.split(' ')[0]

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mt: '50%' }}>
      <CheckIcon sx={{ fontSize: '4rem', color: 'error.main' }} />
      <Typography variant="h4" sx={{ ml: 1, mb: 1 }}>
          Thanks, {providerFirstName}
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ ml: 1, mb: 3 }}>
        Have a good week
      </Typography>
    </Box>
  )
}

const mapStateToProps = (state: AppState) => {
  const LOGGED_IN_PROVIDER_ID = 1
  
  return {
    provider: state.providers.find(provider => provider.id === LOGGED_IN_PROVIDER_ID)
  }
}

export default connect(mapStateToProps)(ProviderDone)