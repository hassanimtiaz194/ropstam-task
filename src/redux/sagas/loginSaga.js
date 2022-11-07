import axios from "axios";
import { call, put, all, select, takeEvery, takeLatest } from "redux-saga/effects";
import { loginAction } from "../actions";
import { LOGIN_APP } from "../actions/types";
import { LOGIN_ENDPOINT } from "./Endpoints";

function* login(payload) {
    const { userName, password } = payload.payload;
    const URL = `${LOGIN_ENDPOINT}`;
    try {
        const { data } = yield call(axios.get, URL);
        let user = data.find((users) => {
            return users.username === userName && users.password === password
        })
        yield put(
            loginAction.appLoginStatus(user)
        );
    } catch (e) {
        console.log(e.message)
    }
}


function* loginSaga() {
    yield takeLatest(LOGIN_APP, login);
}
export default function* rootSaga() {
    yield all([
        loginSaga()
    ]);
}