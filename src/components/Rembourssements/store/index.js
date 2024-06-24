import { createStore, combineReducers } from 'redux';
import chargebackReducer from '../reducers/chargebackReducer';
const rootReducer = combineReducers({
  chargebacks: chargebackReducer,
});

const store = createStore(rootReducer);

export default store;
