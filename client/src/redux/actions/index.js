import axios from "axios";
import swal from "sweetalert";

const ruta = "http://localhost:3001/";
export function getDogs() {
    return async function(dispatch) {
      try {
        var json = await axios.get('/dogs');
        console.log(json)
        return dispatch({
            type: "GET_DOGS",
            payload: json.data
        }) 
      } catch (error) {
          console.log(error)
      }  
    }
}

export function getNameDogs(name) {
  return async function(dispatch) {
    try {
      var json = await axios.get(`/dogs?name=`+ name)
      return dispatch({
        type: "GET_NAME_DOGS",
        payload: json.data
      })
    } catch (error) {
      console.log(error)
      swal('Dog not found')
    }
  }
}

export function getTemperaments() {
  
    return async function(dispatch){
      var info = await axios.get("/temperament");
      console.log(info.data);
      return dispatch({
        type: 'GET_TEMPERAMENTS',
        payload: info.data
      })
    }
  
}

export function postDogs(payload) {
  // console.log(payload)
   return async function (dispatch){
       const response = await axios.post("/dogs", payload);
       console.log(response);
       return response;
   }
   
}

export function filterDogsByTemperaments(payload){
  // console.log("payload",payload)
   return{
       type: "FILTER_BY_TEMPERAMENTS",
       payload
   }
}

export function filterCreated(payload) {
  return {
    type: 'FILTER_CREATED',
    payload
  }
}

export function orderByName(payload) {
  return  {
    type:'ORDER_BY_NAME',
    payload
  }
}

export function orderByWeight(payload) {
  return {
    type: 'ORDER_BY_WEIGHT',
    payload
  }
}
export function getDogDetail(id) {
  return async function(dispatch){
    try {
      const json = await axios.get("/dogs/" + id)
    return dispatch({
      type: 'GET_DOG_DETAIL',
      payload: json.data
    })
    } catch (error) {
      console.log('Error en obtener los detalles',error);
    }
  }

}
export function cleanDetail(){
  return{
    type: 'CLEAN_DETAIL',
    payload: []
  }
}