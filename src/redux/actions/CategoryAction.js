import { CATEGORY_DATA_LOADED, CATEGORY_UPDATED, CREATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORY_DATA, LOAD_DATA_UPDATE, UPDATE_CATEGORY } from "./types";

export function createCategory(data) {
  return {
    type: CREATE_CATEGORY,
    payload: data
  };
}
export function getAllCategory() {
  return {
    type: GET_CATEGORY_DATA,
  };
}
export function categoryDataLoaded(response) {
  return {
    type: CATEGORY_DATA_LOADED,
    payload: response
  };
}


export function deleteCategory(data) {
  console.log(data)
  return {
    type: DELETE_CATEGORY,
    payload: data
  };
}

export function updateCategory(data) {
  console.log(data)
  return {
    type: UPDATE_CATEGORY,
    payload: data
  };
}

export function loadDataToBeUpdated(data) {
  console.log(data)
  return {
    type: LOAD_DATA_UPDATE,
    payload: data
  };
}

export function updatingData(data) {
  console.log(data)
  return {
    type: CATEGORY_UPDATED,
    payload: data
  };
}
