import axios from "axios";
import { useNavigate } from "react-router-dom";
import { call, put, all, select, takeEvery, takeLatest } from "redux-saga/effects";
import { categoryAction } from "../actions";
import { CATEGORY_UPDATED, CREATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORY_DATA, UPDATE_CATEGORY } from "../actions/types";
import { categorySelectors } from "../selectors";
import { GET_ALL_CARS_ENDPOINT, GET_ALL_CATEGORY_ENDPOINT } from "./Endpoints";

function* createCategory(action) {
    //const categories = yield select((categorySelectors.makeSelectShowCategory()));
    //console.log(categories);
    const { category } = action.payload;
    const URL = `${GET_ALL_CATEGORY_ENDPOINT}`;
    const { data } = yield call(axios.get, URL)
    const categoryLength = data[data.length - 1].id + 1;
    axios({
        method: 'post',
        url: URL,
        data: {
            id: categoryLength + 1,
            category: category

        }
    });
}

function* getAllCategory() {
    const URL = `${GET_ALL_CATEGORY_ENDPOINT}`;
    const { data } = yield call(axios.get, URL)
    yield put(
        categoryAction.categoryDataLoaded(data)
    );
}

function* deleteCategory(action) {
    console.log(action)
    const URL = `${GET_ALL_CATEGORY_ENDPOINT}` + '/' + action.payload;
    axios.delete(URL)
}

function* updateCategory(action) {
    const URL = `${GET_ALL_CATEGORY_ENDPOINT}` + '/' + action.payload;
    const { data } = yield call(axios.get, URL)
    if (data) {
        yield put(
            categoryAction.loadDataToBeUpdated(data)
        );
    }
}

function* categoryUpdated(action) {
    console.log(action)
    const URL = `${GET_ALL_CATEGORY_ENDPOINT}` + '/' + action.payload.id;
    axios.put(URL, {
        id: action.payload.id,
        category: action.payload.category
    });
}

function* createCategorySaga() {
    yield takeLatest(CREATE_CATEGORY, createCategory);
}
function* getAllCategorySaga() {
    yield takeLatest(GET_CATEGORY_DATA, getAllCategory);
}
function* deleteCategorySaga() {
    yield takeLatest(DELETE_CATEGORY, deleteCategory);
}

function* updateCategorySaga() {
    yield takeLatest(UPDATE_CATEGORY, updateCategory);
}

function* categoryUpdatedSaga() {
    yield takeLatest(CATEGORY_UPDATED, categoryUpdated);
}

export default function* rootSaga() {
    yield all([
        createCategorySaga(),
        getAllCategorySaga(),
        deleteCategorySaga(),
        updateCategorySaga(),
        categoryUpdatedSaga()
    ]);
}