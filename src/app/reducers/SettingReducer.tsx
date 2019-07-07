import {
  OFF_SETTING_RETRY_CONNECTION,
  OFF_SETTING_WIFI_ONLY,
  ON_SETTING_RETRY_CONNECTION,
  ON_SETTING_WIFI_ONLY,
} from "@actions/Types";

const initialState = {
  isWifiOnlyEnabled: null,
  isRetryConnectionEnabled: null,
};

export const SettingReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ON_SETTING_WIFI_ONLY:
      return {
        ...state,
        isWifiOnlyEnabled: true,
      };
    case OFF_SETTING_WIFI_ONLY:
      return {
        ...state,
        isWifiOnlyEnabled: false,
      };
    case ON_SETTING_RETRY_CONNECTION:
      return {
        ...state,
        isRetryConnectionEnabled: true,
      };
    case OFF_SETTING_RETRY_CONNECTION:
      return {
        ...state,
        isRetryConnectionEnabled: false,
      };
  }
  return state;
};
