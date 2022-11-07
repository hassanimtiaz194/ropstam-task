import axios from "axios";
import { call, put, all, select, takeEvery, takeLatest } from "redux-saga/effects";
import { carsAction } from "../actions";
import { CARS_UPDATED, CREATE_CARS, DELETE_CARS, GET_CARS_DATA, UPDATE_CARS } from "../actions/types";
import { GET_ALL_CARS_ENDPOINT } from "./Endpoints";

function* createCars(action) {
    console.log(action)
    const { carName, Make, Model, RegNo, Color, Category } = action.payload;
    const URL = `${GET_ALL_CARS_ENDPOINT}`;
    const { data } = yield call(axios.get, URL)


    axios({
        method: 'post',
        url: URL,
        data: {
            id: data.length !== 0 ? data[data.length - 1].id + 1 : 1,
            name: carName,
            make: Make,
            model: Model,
            color: Color,
            regNo: RegNo,
            category: Category
        }
    });
}

function* getAllCars() {
    const URL = `${GET_ALL_CARS_ENDPOINT}`;
    const { data } = yield call(axios.get, URL)
    yield put(
        carsAction.carsDataLoaded(data)
    );
}

function* deleteCars(action) {
    const URL = `${GET_ALL_CARS_ENDPOINT}` + '/' + action.payload;
    axios.delete(URL)
}

function* updateCars(action) {
    const URL = `${GET_ALL_CARS_ENDPOINT}` + '/' + action.payload;
    const { data } = yield call(axios.get, URL)
    if (data) {
        yield put(
            carsAction.loadCarsDataToBeUpdated(data)
        );
    }
}

function* carsUpdated(action) {
    console.log(action)
    const URL = `${GET_ALL_CARS_ENDPOINT}` + '/' + action.payload.id;
    axios.put(URL, {
        id: action.payload.id,
        name: action.payload.carName,
        make: action.payload.Make,
        model: action.payload.Model,
        color: action.payload.Color,
        regNo: action.payload.RegNo,
        category: action.payload.Category
    });
}

function* createCarsSaga() {
    yield takeLatest(CREATE_CARS, createCars);
}
function* getAllCarsSaga() {
    yield takeLatest(GET_CARS_DATA, getAllCars);
}
function* deleteCarsSaga() {
    yield takeLatest(DELETE_CARS, deleteCars);
}
function* updateCarsSaga() {
    yield takeLatest(UPDATE_CARS, updateCars);
}
function* carsUpdatedSaga() {
    yield takeLatest(CARS_UPDATED, carsUpdated);
}
export default function* rootSaga() {
    yield all([
        createCarsSaga(),
        getAllCarsSaga(),
        deleteCarsSaga(),
        updateCarsSaga(),
        carsUpdatedSaga()
    ]);
}