import { FC, useRef } from 'react'
import { connect } from 'react-redux'
import { AppState, Provider } from '../../types'

import Done from '../Done'

type ProviderDoneProps = {
  provider: Provider
}

const ProviderDone: FC<ProviderDoneProps> = ({
  provider
}) => {
  const providerRef = useRef<Provider>(provider)

  const providerFirstName = providerRef.current.name.split(' ')[0]

  return (
    <Done name={providerFirstName} desc="Have a good week" />
  )
}

const mapStateToProps = (state: AppState) => {
  const LOGGED_IN_PROVIDER_ID = 1
  
  return {
    provider: state.providers.find(provider => provider.id === LOGGED_IN_PROVIDER_ID)
  }
}

export default connect(mapStateToProps)(ProviderDone)