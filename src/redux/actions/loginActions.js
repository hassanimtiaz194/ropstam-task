import {
  LOGIN_APP,
  LOGIN_APP_STATUS
} from "./types";

export function appLogin(login) {
  return {
    type: LOGIN_APP,
    payload: login
  };
}

export function appLoginStatus(login) {
  return {
    type: LOGIN_APP_STATUS,
    payload: login
  };
}