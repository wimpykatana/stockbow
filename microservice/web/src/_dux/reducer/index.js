import { combineReducers } from "redux";
import user from './userReducer';
import jkse from './jkseReducer';
import news from './newsReducer';


export default combineReducers({

    user,
    jkse,
    news
   
});
