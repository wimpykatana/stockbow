export default function reducer(state={
    data: null,
    fetching: false,
    fetched: false,
    error: null,
    token: null,
}, action) { // eslint-disable-next-line
    switch (action.type){

      case "LOGIN_BEGIN" : {
          return {...state, fetching: true, fetched: false }
      }
      case "LOGIN_SUCCESS":{
          return {...state, fetching: false, fetched: true, data: action.payload, isLogin: true, error: false }
      }
      case "LOGIN_REJECT":{
          return {...state, fetching: false, fetched: true, data: action.payload, isLogin: false, error: true }
      }
      case "LOGIN_FINISH":{
        return {...state, fetching: false, fetched: true, error: false }
      }
      case "GET_USER_DETAIL_BEGIN":{
        return {...state, fetching: true, fetched: false }
      }
      case "GET_USER_DETAIL_SUCCESS":{
        return {...state, fetching: false, fetched: true, data: action.payload }
      }

    }
    
    return state;
};
