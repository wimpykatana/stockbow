// import config from '../../config/config.json';
// import axios from 'axios';

export function onLogin(name,email,token,provider_pic,provider_id,provider){
    return function(dispatch){
        dispatch({type: "START_LOGIN"});
        console.log(name);
        console.log(email);
        console.log(token);
        console.log(provider_pic);
        console.log(provider_id);
        console.log(provider);

    }
}

export function onLogout(token) {
    return function(dispatch) {
        dispatch({type: "START_LOGOUT"});


    }
}
