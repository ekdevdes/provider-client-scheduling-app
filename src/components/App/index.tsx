// Libs
import { FC } from 'react'
import { connect } from "react-redux"
import { 
  AppState, 
  ProviderForm as ProviderFormType, 
  ClientForm as ClientFormType 
} from '../../types'

// Material components
import Box from '@mui/material/Box'

// Internal components
import TabBar from '../TabBar'
import NavBar from '../NavBar'
import ProviderForm from '../ProviderForm'
import ProviderConfirm from '../ProviderConfirm'
import ProviderDone from '../ProviderDone'
import ClientProviderList from '../ClientProviderList'
import ClientBooking from '../ClientBooking'
import ClientConfirm from '../ClientConfirm'
import ClientDone from '../ClientDone'

// Styles
import './index.scss';

type AppProps = {
  activeTabIndex: number,
  providerForm: ProviderFormType,
  clientForm: ClientFormType
}

const App: FC<AppProps> = ({ 
  activeTabIndex, 
  providerForm, 
  clientForm 
}) => {
  const isProviderTabActive = activeTabIndex === 0

  // This is the meat the of the rendering logic for the application
  // In a prod app I might extract this to a seperate file and just pass in `providerForm` and `clientForm` to make *this* file a little shorter
  const renderPage = () => {
    // Provider app
    if (isProviderTabActive) {
      if (providerForm.submitted && !providerForm.confirmed) {
        return (<ProviderConfirm />)
      }

      if (providerForm.submitted && providerForm.confirmed) {
        return (<ProviderDone />)
      }

      return (<ProviderForm />)
    }

    // Client app
    if (!clientForm.isBooking && !clientForm.isSubmitted && !clientForm.isConfirmed) {
      return (<ClientProviderList />)
    } else if (clientForm.isBooking && !clientForm.isSubmitted && !clientForm.isConfirmed) {
      return (<ClientBooking />)
    } else if (clientForm.isBooking && clientForm.isSubmitted && !clientForm.isConfirmed) {
      return (<ClientConfirm />)
    } else {
      return (<ClientDone />)
    }
  }

  return (
    <>
      <NavBar />
      <Box sx={{ mt: '1.25rem', mr: '5px', ml: '5px', mb: '1.25rem' }}>
        {renderPage()}
        <TabBar />
      </Box>
    </>
  )
}

const mapStateToProps = (state: AppState) => ({
  activeTabIndex: state.activeTabIndex,
  providerForm: state.providerForm,
  clientForm: state.clientForm
})


export default connect(mapStateToProps)(App)
