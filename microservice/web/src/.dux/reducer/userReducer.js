export default function reducer(state={
    data: null,
    fetching: false,
    fetched: false,
    error: null,
    token: null,
}, action) {
    switch(action.type){
        case "START_LOGIN" : {
            return {...state, fetching: true}
        }
        case "LOGIN_SUCCES":{
            return {...state, fetching: false, fetched: true, data: action.payload, isLogin: true, error: false}
        }
        case "LOGIN_REJECT":{
            return {...state, fetching: false, fetched: true, data: action.payload, error: true, isLogin: false}
        }
        case "START_LOGOUT" : {
            return {...state, fetching: true}
        }
        case "LOGOUT_SUCCES":{
            return {...state, fetching: false, fetched: true, data: action.payload, error: false}
        }
        case "LOGOUT_REJECT":{
            return {...state, fetching: false, fetched: true, data: action.payload, error: true}
        }
    }
    
    return state;
};