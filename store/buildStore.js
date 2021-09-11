import mainReducer from "./reducers/main";
import {combineReducers, createStore} from 'redux';
import {REDUX_MAIN_MODULE_NAME} from './constants';

const allReducers = combineReducers({
    [REDUX_MAIN_MODULE_NAME]: mainReducer,
});
  
const buildStore = () => createStore(allReducers);

export default buildStore;