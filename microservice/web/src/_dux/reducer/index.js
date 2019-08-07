import { combineReducers } from "redux";
import user from './userReducer';
import jkse from './jkseReducer';


export default combineReducers({

    user,
    jkse
   
});
