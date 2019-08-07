import axios from 'axios';

export function getJKSE() {
  return async function(dispatch){
    dispatch({type: "JKSE_GET_BEGIN"});

    await axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=^jkse&apikey=TTOREIGU6WMU6VYD")

      .then((res)=>{
        if(res && res.data) {

          dispatch({type: "JKSE_GET_SUCCESS", payload: res.data['Time Series (Daily)']});
        }
      })
      .catch((err)=>{
        dispatch({type: "JKSE_GET_REJECT", payload: err.response.data})
      });

    dispatch({type: "JKSE_GET_FINISH"});
  }
}
