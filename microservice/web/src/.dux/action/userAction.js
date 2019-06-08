// import config from '../../config/config.json';
// import axios from 'axios';

export function onlogin(username, pass){
    return function(dispatch){
        dispatch({type: "START_LOGIN"});

        axios.post(config.api+"/adminuser/login", {
            email: username,
            password: pass
        })
        .then(json => {
            const data = json.data;

            dispatch({type: "LOGIN_SUCCES", payload: data.user});
            
        }).catch((error) => {
            if(error.response && error.response.data) {
                return dispatch({type: "LOGIN_REJECT", payload: error.response.data.details[0]});
            }
            
            return dispatch({type: "LOGIN_REJECT", payload: error.response});
        })
    }
}

export function logout(token) {
    return function(dispatch) {
        dispatch({type: "START_LOGOUT"});

        axios.get(config.api+"/adminuser/logout", {
            headers: {
                "Authorization": "Bearer "+token
            }
        })
        .then((response) => {
            dispatch({type: "START_LOGOUT_SUCCESS", payload: response.data});
            window.location.reload();
        })
        .catch((error) => {
            dispatch({type: "START_LOGOUT_FAILED", payload: error.response});
        });
    }
}
