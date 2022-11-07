import { createSelector } from "reselect";
import { initialState } from "../reducer";

const selectcarsState = (state) => (state || initialState).cars;

const makeSelectCars = () =>
    createSelector(selectcarsState, (cars) => cars);

const makeSelectShowCars = () =>
    createSelector(selectcarsState, (cars) => cars.carsData);

const makeSelectShowCarsUpdation = () =>
    createSelector(selectcarsState, (cars) => cars.carDataUpdate);

const carSelectors = {
    makeSelectCars,
    makeSelectShowCars,
    makeSelectShowCarsUpdation
};

export default carSelectors;
