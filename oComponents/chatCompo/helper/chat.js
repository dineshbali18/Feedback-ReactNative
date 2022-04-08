import { API,API3 } from "../../../backend";

export const getRooms = () => {
  return fetch(`${API3}/getRooms`, 
  { method: "GET" })
    .then(response => {
        // console.log(response.json)
      return response.json();
    })
    .catch(err => console.log(err));
};


export const getNameById=(id)=>{
   return fetch(`https://userda.herokuapp.com/api/user/get/name/${id}`, 
   { method: "GET" })
   .then(response => {
       console.log(response)
     return response.json();
   })
   .catch(err => console.log(err));
}

export const sendReport=report=>{
  // console.log(report);
  return fetch(``,{
   method:"POST",
   headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(report)
  }).then(response => {
    return response.json();
  })
  .catch(err =>{ console.log("<<<<<<<<<<<<<<<"),console.log(err),console.log("<<<<<<<<<<<<<<<")});
}