import { FC } from 'react'
import { connect } from "react-redux"
import { 
  AppState, 
  ProviderForm as ProviderFormType, 
  ClientForm as ClientFormType 
} from '../../types'

import TabBar from '../TabBar'
import NavBar from '../NavBar'
import ProviderForm from '../ProviderForm'
import ProviderConfirm from '../ProviderConfirm'
import ProviderDone from '../ProviderDone'
import ClientProviderList from '../ClientProviderList'
import ClientBooking from '../ClientBooking'
import ClientConfirm from '../ClientConfirm'
import ClientDone from '../ClientDone'

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

  const renderPage = () => {
    if (isProviderTabActive) {
        if (providerForm.submitted && !providerForm.confirmed) {
          return (<ProviderConfirm />)
        }

        if (providerForm.submitted && providerForm.confirmed) {
          return (<ProviderDone />)
        }

        return (<ProviderForm />)
    }

    if (!clientForm.isBooking && !clientForm.isSubmitted && !clientForm.isConfirmed) {
      return (<ClientProviderList />)
    } else if (clientForm.isBooking && !clientForm.isSubmitted && !clientForm.isConfirmed) {
      return (<ClientBooking />)
    } else if (clientForm.isBooking && clientForm.isSubmitted && !clientForm.isConfirmed) {
      return (<ClientConfirm />)
    } else {
      return (<ClientDone />)
    }

    return null
  }

  return (
    <>
      <NavBar />
      <div className="app">
        {renderPage()}
        <TabBar />
      </div>
    </>
  )
}

const mapStateToProps = (state: AppState) => ({
  activeTabIndex: state.activeTabIndex,
  providerForm: state.providerForm,
  clientForm: state.clientForm
})


export default connect(mapStateToProps)(App)
