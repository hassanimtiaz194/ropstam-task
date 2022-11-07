import { all } from "redux-saga/effects";
import loginSaga from './loginSaga';
import carSaga from './CarsSaga';
import registerSaga from './registerSaga';
import categorySaga from './categorySaga';
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registerSaga(),
    categorySaga(),
    carSaga(),
  ]);
}
