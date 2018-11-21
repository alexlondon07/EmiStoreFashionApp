import { ADD_NEW_CATEGORY, GET_DATA_CATEGORIES, REMOVE_CATEGORY, UPDATE_CATEGORY } from "../actionsTypes/action-types";
import { List as list, Map as map, fromJS } from 'immutable';
//const initialState = fromJS([]);
const initialState = list([]);

export const categoryItems = ( state = initialState, action ) => {
    switch(action.type){
        case ADD_NEW_CATEGORY:
            //return [ ...state, action.payload ];
            return state.push(action.payload);

        case GET_DATA_CATEGORIES:
            //return [ ...state, action.payload ];
            return state.push(action.payload);
        
        case UPDATE_CATEGORY:
            return null;

        case REMOVE_CATEGORY:    
            return state.filter(item => item.idCategory !== action.payload.idCategory );
    }
    return state;
}