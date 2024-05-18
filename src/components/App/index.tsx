import { FC } from 'react'
import { connect } from "react-redux"
import { AppState, ProviderForm as ProviderFormType } from '../../types'

import TabBar from '../TabBar'
import NavBar from '../NavBar'
import ProviderForm from '../ProviderForm'
import ProviderConfirm from '../ProviderConfirm'
import ProviderDone from '../ProviderDone'

import './index.scss';

type AppProps = {
  activeTabIndex: number,
  providerForm: ProviderFormType
}

const App: FC<AppProps> = ({ activeTabIndex, providerForm }) => {
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

    return (<p>Hi Customer</p>)
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
  providerForm: state.providerForm
})


export default connect(mapStateToProps)(App)
