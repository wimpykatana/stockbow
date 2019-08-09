import axios from 'axios';
import config from "../../config/config";
import { getFromStorage } from "../../_libs/storage";

export function getNews(emiten) {
  return async function(dispatch){

    dispatch({type: "NEWS_GET_BEGIN"});
    let user = getFromStorage("USER");

    await axios.get(config.api+"/news/"+emiten, {
      headers: {"Authorization" : `Bearer ${user.token}`}
    })
      .then((res)=>{
        if(res && res.data) {

          dispatch({type: "NEWS_GET_SUCCESS", payload: res.data});
        }
      })
      .catch((err)=>{
        dispatch({type: "NEWS_GET_REJECT", payload: err.response.data})
      });

    dispatch({type: "NEWS_GET_FINISH"});

  }
}
