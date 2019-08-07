export default function reducer( state={
  data: null,
  fetching: false,
  fetched: false,
  error: null,
}, action) { // eslint-disable-next-line
  switch (action.type){

    case "JKSE_GET_BEGIN" : {
      return {...state, fetching: true, fetched: false }
    }
    case "JKSE_GET_SUCCESS":{
      return {...state, fetching: false, fetched: true, data: action.payload }
    }
    case "JKSE_GET_REJECT":{
      return {...state, fetching: false, fetched: true, data: action.payload, error: true }
    }
    case "JKSE_GET_FINISH":{
      return {...state, fetching: false, fetched: true, error: false }
    }


  }

  return state;
};
