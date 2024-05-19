// Libs
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store';

// Internl components
import App from './components/App'

// Normalize helps ensure all browsers are starting from the same baseline styles (since they can be a little different)
import './normalize.css'

// In a production app I'd add an ErrorBoundary component here to show a pretty error screen to the user and record the js error to datadog
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)