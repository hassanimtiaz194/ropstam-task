import axios from "axios";
import { call, put, all, select, takeEvery, takeLatest } from "redux-saga/effects";
import { loginAction } from "../actions";
import { REGISTER_USER } from "../actions/types";
import { LOGIN_ENDPOINT } from "./Endpoints";

function* register(payload) {
    const { Email, Name, password, phone } = payload.payload;
    const URL = `${LOGIN_ENDPOINT}`;
    try {
        const { data } = yield call(axios.get, URL);
        axios({
            method: 'post',
            url: URL,
            data: {
                id: data[data.length - 1].id + 1,
                name: Name,
                username: Email,
                password: password,
                phone: phone,
                userType: "user"
            }
        });

    } catch (e) {
        console.log(e.message)
    }
}


function* registerSaga() {
    yield takeLatest(REGISTER_USER, register);
}
export default function* rootSaga() {
    yield all([
        registerSaga()
    ]);
}