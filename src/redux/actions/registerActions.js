import {
  REGISTER_USER
} from "./types";

export function registerUser(user) {
  return {
    type: REGISTER_USER,
    payload: user
  };
}
