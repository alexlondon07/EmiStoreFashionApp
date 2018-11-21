import { createStore } from 'redux';
import { categoryItems } from '../redux/reducers/reducers-category-list';
import { combineReducers } from 'redux-immutable';

const rootReducers = combineReducers ({
    categories: categoryItems,
});

export default store = createStore(rootReducers);