import {applyMiddleware, createStore} from "redux";
import reducer from './reducer'
import {composeWithDevTools} from "redux-devtools-extension";
import {createLogger} from "redux-logger/src";


export const store = createStore(reducer, composeWithDevTools(applyMiddleware(createLogger())));