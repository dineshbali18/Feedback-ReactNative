export const getFeedbackData = (id) => {
    return fetch(`https://teacherb.herokuapp.com/api/data/teacher/sections/${id}`,
    { method: "GET" })
      .then(response => {
          // console.log(response);
        return response.json();
      })
      .catch(err => console.log(err));
  };

  export const getFeedback = (section) => {
    return fetch(`https://teacherb.herokuapp.com/api/section/teachers/section/${section}`,
    { method: "GET" })
      .then(response => {
          // console.log(response);
        return response.json();
      })
      .catch(err => console.log(err));
  };

  // export const getNameFromDB=(id)=>{
  //   console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
  //   console.log(id);
  //   console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")

  //   return fetch(`https://teacherb.herokuapp.com/api/get/name/${id}`,
  //   { method: "GET" })
  //     .then(response => {
  //         console.log(response);
  //       return response.json();
  //     })
  //     .catch(err => console.log(err));
  // }