import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import RootReducer from "./reducer";
import sagas from "./sagas";
const sagaMiddleware = createSagaMiddleware();
const store = createStore(RootReducer,
    compose(
        applyMiddleware(sagaMiddleware),
    )
);
sagaMiddleware.run(sagas);
export default store;