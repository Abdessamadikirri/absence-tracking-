import { createStore ,combineReducers,applyMiddleware,compose} from "redux";

import { thunk } from "redux-thunk";

import Authreducer from "./reducers/authreducer";
 

const allreducers = combineReducers({user:Authreducer})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = createStore(allreducers, composeEnhancers(applyMiddleware(thunk)))

export default Store