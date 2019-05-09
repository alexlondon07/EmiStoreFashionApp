import { ADD_TO_CART, REMOVE_FROM_CART } from "../actionsTypes/action-types";

const cartItems = ( state = [], action ) => {

    switch(action.type){
        case ADD_TO_CART:
            return [ ...state, action.payload ];

        case REMOVE_FROM_CART:    
            return state.filter(cartItem => cartItem.ideProduct !== action.payload.ideProduct );
    }
    return state;
}

export default cartItems;