import {
  CARS_DATA_LOADED,
  CARS_UPDATED,
  CREATE_CARS,
  DELETE_CARS,
  GET_CARS_DATA,
  LOAD_CARS_DATA_UPDATE,
  UPDATE_CARS,
} from "./types";

export function createCar(data) {
  return {
    type: CREATE_CARS,
    payload: data
  };
}
export function getAllCars() {
  return {
    type: GET_CARS_DATA,
  };
}

export function carsDataLoaded(response) {
  return {
    type: CARS_DATA_LOADED,
    payload: response
  };
}

export function deleteCar(data) {
  return {
    type: DELETE_CARS,
    payload: data
  };
}


export function updateCars(data) {
  console.log(data)
  return {
    type: UPDATE_CARS,
    payload: data
  };
}

export function loadCarsDataToBeUpdated(data) {
  console.log(data)
  return {
    type: LOAD_CARS_DATA_UPDATE,
    payload: data
  };
}

export function updatingCarsData(data) {
  console.log('hello')
  return {
    type: CARS_UPDATED,
    payload: data
  };
}