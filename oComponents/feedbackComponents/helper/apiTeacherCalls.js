import { API,API2,API4 } from "../../../backend";

export const getTeachers = (section) => {
  // console.log(section)
  return fetch(`https://teacherb.herokuapp.com/api/section/teachers/section/${section}`,
  { method: "GET" })
    .then(response => {
        // console.log(response);
      return response.json();
    })
    .catch(err => console.log(err));
};


export const Submit_Rating=(rate,id)=>{
  // console.log(rate);
  // console.log(id)
  // https://teacherb.herokuapp.com/api/teacher/ratings/624dc19a8acd075bd7719fdb
  return fetch(`https://teacherb.herokuapp.com/api/teacher/ratings/${id}`,{
   method:"POST",
   headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({rating:rate})
  }).then(response => {
    console.log(response)
    return response.json();
  })
  .catch(err =>{ console.log("<<<<<<<<<<<<<<<"),console.log(err),console.log("<<<<<<<<<<<<<<<")});
}

export const Submit_Feedback=(feed,id)=>{
  console.log(feed);
  console.log(id);
  return fetch(`https://teacherb.herokuapp.com/api/teacher/feedback/${id}`,{
   method:"POST",
   headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({msg:feed})
  }).then(response => {
    return response.json();
  })
  .catch(err =>{ console.log("<<<<<<<<<<<<<<<"),console.log(err),console.log("<<<<<<<<<<<<<<<")});
}

// export const getNamesWithPercentages=()=>{
//   return fetch(`${API}/user/getpercentages`, 
//   { method: "GET" })
//     .then(response => {
//       // console.log(response);
//       return response.json();
//     })
//     .catch(err => console.log(err));

// }

// export const increVote=(userId,contestantid,token)=>{
//   // console.log("deta",userId,contestantid)
//     return fetch(`${API}/user/${userId}/contestant/incre/${contestantid}`, 
//     { method: "GET",
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`
//     }
//   }).then(response => {
//     return response.json();
//   })
//   .catch(err => console.log(err));
// }

// export const loadUserVotes=(token,userId)=>{
//   // console.log("user",userId);
//   return fetch(`${API}/user/${userId}/loadvotes`,
//   {method:"GET",
//   headers: {
//     Accept: "application/json",
//     Authorization: `Bearer ${token}`
//   }}).then(response => {
//     return response.json();
//   })
//   .catch(err => console.log(err));
// }

// export const decrement=(token,userId)=>{
//   return fetch(`${API}/user/${userId}/votes/decre`,
//   {method:"GET",
//   headers: {
//     Accept: "application/json",
//     Authorization: `Bearer ${token}`
//   }})
// }

// .then(response => {
//   return response.json();
// })
// .catch(err => console.log(err));