import { createSelector } from "reselect";
import { initialState } from "../reducer";

const selectLoginState = (state) => (state || initialState).login;

const makeSelectLogin = () =>
    createSelector(selectLoginState, (login) => login);

const makeSelectLoginStatus = () =>
    createSelector(selectLoginState, (login) => login.loginStatus);

const loginSelectors = {
    makeSelectLogin,
    makeSelectLoginStatus
};

export default loginSelectors;
