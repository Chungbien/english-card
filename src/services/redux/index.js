import { combineReducers } from 'redux';
import store from './store';

const rootReducer = combineReducers({
    word: store
});

export default rootReducer;