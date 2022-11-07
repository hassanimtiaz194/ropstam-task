import { CATEGORY_DATA_LOADED, LOAD_DATA_UPDATE } from "../actions/types";

export const initialState = {
    categoryData: null,
    categoryDataUpdate: null,
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORY_DATA_LOADED:
            return { ...state, categoryData: action.payload };
        case LOAD_DATA_UPDATE:
            return { ...state, categoryDataUpdate: action.payload };
        default:
            return state;
    }
};

export default categoryReducer;
