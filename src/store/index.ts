import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers'

// In a production application I'd have one reducer for providers, one for clients and one for app state
// And combine them using `combineReducers`
const store = configureStore({
  reducer
})

export default store