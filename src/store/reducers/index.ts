import clone from 'lodash/cloneDeep'
import { 
  AppState, 
  Action, 
  ActionTypes, 
  TabIndexAction,
  ProviderUpdateAction,
  Provider,
  SelectedAvailAction,
  ClientProviderAction
} from '../../types'

import { providers } from '../../data/providers.json'
import { clients } from '../../data/clients.json'

const initialState: AppState = {
  activeTabIndex: 0,
  providers: providers,
  clients: clients,
  providerForm: {
    providerId: null,
    avails: [],
    submitted: false,
    confirmed: false
  },
  clientForm: {
    isBooking: false,
    isSubmitted: false,
    isConfirmed: false,
    provider: {
      id: 0,
      name: '',
      availability: []
    },
    selectedAvail: {
      id: 0,
      day: '',
      startTime: '',
      endTime: ''
    }
  }
};
  
  const appReducer = (state = initialState, action: Action) => {
    switch (action.type) {
      case ActionTypes.UPDATE_ACTIVE_TAB_INDEX: 
        return { ...state, activeTabIndex: (action.payload as TabIndexAction).tabIndex }
      case ActionTypes.UPDATE_PROVIDER_AVAIL:
        const _providers = clone(state.providers)
        let providerIndex = 0

        const provider: Provider = state.providers.find((provider, index) => {
          providerIndex = index

          return provider.id === (action.payload as ProviderUpdateAction).providerId
        }) ?? { id: 0, name: '', availability: [] }

        _providers[providerIndex] = {
          ...provider,
          availability: (action.payload as ProviderUpdateAction).avails
        }
        
        return {
          ...state,
          providerForm: {
            ...state.providerForm,
            submitted: true
          },
          providers: _providers
        }
      case ActionTypes.UPDATE_CLIENT_IS_BOOKING:
        return {
          ...state,
          clientForm: {
            ...state.clientForm,
            isBooking: !state.clientForm.isBooking,
            provider: (action.payload as ClientProviderAction).provider
          }
        }
      case ActionTypes.CLEAR_CLIENT_FORM:
        return {
          ...state,
          clientForm: {
            isBooking: false,
            isSubmitted: false,
            isConfirmed: false,
            provider: {
              id: 0,
              name: '',
              availability: []
            },
            selectedAvail: {
              id: 0,
              day: '',
              startTime: '',
              endTime: ''
            }
          }
        }
      case ActionTypes.UPDATE_CLIENT_IS_SUBMITTING:
          return {
            ...state,
            clientForm: {
              ...state.clientForm,
              isSubmitted: !state.clientForm.isSubmitted,
              selectedAvail: (action.payload as SelectedAvailAction).selectedAvail
            }
          }

      case ActionTypes.UPDATE_CLIENT_IS_CONFIRMING:
          return {
            ...state,
            clientForm: {
              ...state.clientForm,
              isConfirmed: !state.clientForm.isConfirmed
            }
          }
      case ActionTypes.CONFIRM_PROVIDER_FORM:
        return {
          ...state,
          providerForm: {
            ...state.providerForm,
            confirmed: !state.providerForm.confirmed
          }
        }
      case ActionTypes.UPDATE_PROVIDER_FORM: 
        return {
          ...state,
          providerForm: {
            ...state.providerForm,
            ...action.payload as ProviderUpdateAction
          }
        }
      default:
        return state;
    }
  };
  
  export default appReducer;