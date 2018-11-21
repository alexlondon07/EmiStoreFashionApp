import { ADD_NEW_CATEGORY, GET_DATA_CATEGORIES, REMOVE_CATEGORY, UPDATE_CATEGORY } from "../../../redux/actionsTypes/action-types";

export const MESSAGES = {
    ERROR_TRIES_LATER: 'An error has occurred, try it later',
    INFORMATION_CREATED_SUCCESFULLY: 'Information created successfully',
    CANNOT_DELETE_ITEM: 'Cannot delete item'
}

export function STORE_DISPATCH_ADD_NEW_CATEGORY(data) {
    store.dispatch({
        type: ADD_NEW_CATEGORY,
        payload: data
    })
}

export function STORE_DISPATCH_CATEGORIES(data) {
    store.dispatch({
        type: GET_DATA_CATEGORIES,
        payload: data
    })
}

export function STORE_DISPATCH_REMOVE_CATEGORY(data) {
    store.dispatch({
        type: REMOVE_CATEGORY,
        payload: data
    })
}

export function STORE_DISPATCH_UPDATE_CATEGORY(data) {
    store.dispatch({
        type: UPDATE_CATEGORY,
        payload: data
    })
}