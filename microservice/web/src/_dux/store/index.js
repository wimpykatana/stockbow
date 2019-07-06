import { applyMiddleware, createStore } from "redux";
import { createLogger } from 'redux-logger';
import thunk from "redux-thunk";
import reducer from "../reducer";

const debug = process.env.NODE_ENV !== "production";
let middleware;

if(debug){
    middleware = applyMiddleware(thunk, createLogger());
}else{
    middleware = applyMiddleware(thunk);
}

export default createStore(reducer, middleware);