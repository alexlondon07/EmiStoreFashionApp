import { ADD_TO_CART, REMOVE_FROM_CART } from "../actionsTypes/cart-action-types";

export function addProductToCart( product ) {
    return { type: ADD_TO_CART, payload: product }
}

export function removeProductToCart( product ) {
    return { type: REMOVE_FROM_CART, payload: product }
}