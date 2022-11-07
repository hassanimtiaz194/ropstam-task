import { CARS_DATA_LOADED, LOAD_CARS_DATA_UPDATE } from "../actions/types";

export const initialState = {
    carsData: null,
    carDataUpdate: null
};

const carsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CARS_DATA_LOADED:
            return { ...state, carsData: action.payload };
        case LOAD_CARS_DATA_UPDATE:
            return { ...state, carDataUpdate: action.payload };
        default:
            return state;
    }
};

export default carsReducer;
