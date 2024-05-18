export type NullableString = string|null
export type NullableProvider = Provider|null|undefined
export type NullableNumber = number|null|undefined

export type Availability = {
  id: number
  day: string
  startTime: string
  endTime: string
}

export type ClientAppointment = {
  providerId: number
  date: Availability
}

export type Provider = {
  id: number,
  availability: Availability[]
}

export type Client = {
  id: number
  appointment: ClientAppointment | object
}

export type ProviderForm = {
  providerId: NullableNumber
  avails: Availability[]
  submitted: boolean
  confirmed: boolean
}

export type AppState = {
  activeTabIndex: number
  providers: Provider[]
  clients: Client[]
  providerForm: ProviderForm
}

export type TabIndexAction = {
  tabIndex: number
}

export type ProviderUpdateAction = {
  providerId: number
  avails: Availability[]
}

export type Action = {
  type: string
  payload: TabIndexAction | ProviderUpdateAction
}

export enum ActionTypes {
  UPDATE_ACTIVE_TAB_INDEX = 'UPDATE_ACTIVE_TAB_INDEX',
  UPDATE_PROVIDER_FORM = 'UPDATE_PROVIDER_FORM',
  UPDATE_PROVIDER_AVAIL = 'UPDATE_PROVIDER_AVAIL',
  UPDATE_CLIENT_AVAIL = 'UPDATE_CLIENT_AVAIL',
  CONFIRM_PROVIDER_FORM = 'CONFIRM_PROVIDER_FORM'
}