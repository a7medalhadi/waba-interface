export interface IVerifyPhoneNumber {
  pin: string;
  data_localization_region: string;
}

export interface IConnectWebhook {
  override_callback_uri: string;
  verify_token: string;
}

export interface IGetBusinessInformation {
  id: string;
}
export interface BusinessInformation {
  id: string;
  name: string;
}

export interface IGetWabaAccountInformation {
  id: string;
}
export interface WabaAccountInformation {
  id: string;
  name: string;
}

export interface IGetPhoneNumberInformation {
  id: string;
}
export interface PhoneNumberInformation {
  verified_name : string;
  display_phone_number : string;
  id: string;
}