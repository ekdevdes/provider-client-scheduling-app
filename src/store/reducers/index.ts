import clone from 'lodash/cloneDeep'
import { 
  AppState, 
  Action, 
  ActionTypes, 
  TabIndexAction,
  ProviderUpdateAction,
  Provider
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
        }) ?? { id: 0, availability: [] }

        _providers[providerIndex] = {
          ...provider,
          availability: (action.payload as ProviderUpdateAction).avails
        }

        console.log('updatedProviders', _providers)
        
        return {
          ...state,
          providerForm: {
            ...state.providerForm,
            submitted: true
          },
          providers: _providers
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