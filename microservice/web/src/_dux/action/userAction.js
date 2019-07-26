import config from "../../config/config"
import axios from 'axios';

export  function onLogin(name,email,token,provider_pic,provider_id,provider){
    return async function(dispatch){
        dispatch({type: "LOGIN_BEGIN"});

        await axios.post(config.api+"/user",{
          fullname: name,
          email: email,
          token: token,
          provider_pic: provider_pic,
          provider_id: provider_id,
          provider: provider
        })
        .then((res)=>{
          if(res && res.data){
            dispatch({type: "LOGIN_SUCCESS", payload: res.data});
          }
        })
        .catch((err)=>{
          dispatch({type: "LOGIN_REJECT", payload: err.response.data})
        })

        dispatch({type: "LOGIN_FINISH"});

    }
}

export function onLogout(token) {
    return function(dispatch) {
        dispatch({type: "START_LOGOUT"});


    }
}
