import { createSelector } from "reselect";
import { initialState } from "../reducer";

const selectcategoryState = (state) => (state || initialState).category;

const makeSelectCategory = () =>
    createSelector(selectcategoryState, (cat) => cat);

const makeSelectShowCategory = () =>
    createSelector(selectcategoryState, (cat) => cat.categoryData);
    
const makeSelectShowCategoryUpdation = () =>
    createSelector(selectcategoryState, (cat) => cat.categoryDataUpdate);


const categorySelectors = {
    makeSelectCategory,
    makeSelectShowCategory, 
    makeSelectShowCategoryUpdation
};

export default categorySelectors;
