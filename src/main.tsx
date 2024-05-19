import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store';

import App from './components/App'

import './normalize.css'
import './index.scss'

// In a production app I'd add an ErrorBoundary component here to show a pretty error screen to the user and record the js error to datadog
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)