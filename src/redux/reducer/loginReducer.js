import { LOGIN_APP_STATUS } from "../actions/types";

export const initialState = {
    loginStatus: null,
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_APP_STATUS:
            return { ...state, loginStatus: action.payload };
        default:
            return state;
    }
};

export default loginReducer;
