// Libs
import { FC, useRef } from 'react'
import { connect } from 'react-redux'
import { 
  AppState, 
  Client, 
  ClientForm 
} from '../../types'

// Internal components
import Done from '../shared/Done'

type ClientDoneProps = {
  client: Client,
  clientForm: ClientForm
}

const ClientDone: FC<ClientDoneProps> = ({
  client,
  clientForm,
}) => {
  const clientRef = useRef<Client>(client)
  const clientFirstName = clientRef.current.name.split(' ')[0]

  return (
    <Done 
      name={clientFirstName} 
      desc={`You'll need to bring your insurance card to your appointment with ${clientForm.provider.name}`} 
    />
  )
}

const mapStateToProps = (state: AppState) => {
    // In a prod app we'd likely get the signed in user id from a JWT or a `useAuth` hook but since this just a simple app we're hardcoding it
  const LOGGED_IN_CLIENT_ID = 1
  
  return {
    client: state.clients.find(provider => provider.id === LOGGED_IN_CLIENT_ID),
    clientForm: state.clientForm
  }
}

export default connect(mapStateToProps)(ClientDone)