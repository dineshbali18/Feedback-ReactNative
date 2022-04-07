import { API,API2 } from "../../../backend";
// const API='http://192.168.1.108:5000/api/'

export const signup = user => {
  console.log(user);
    return fetch(`${API}/api/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json();
      })
      .catch(err =>{ console.log("<<<<<<<<<<<<<<<"),console.log(err),console.log("<<<<<<<<<<<<<<<")});
  };

export const signin=user=>{
    // console.log(user)
    return fetch(`${API}/api/signin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
        .then(response => {
          return response.json();
        })
        .catch(err => console.log(err));
};

  //otp calls
  export const getotp = email => {
    //   console.log("email",email)
    return fetch(`${API2}/user/generateotp`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(email)
    })
      .then(response => {
        //   console.log(response);
        return response.json();
      })
      .catch(err => console.log(err));
  };

  export const sendotp=email=>{
      return fetch(`${API2}/user/sendotp`,{
          method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(email)
    })
    .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  }

  export const verifyotp=(email,otpdata)=>{
      console.log("kkkkkkkkkkooookkkkkkkk")
      console.log(email,otpdata);
    return fetch(`${API2}/user/verifyotp`,{
        method:"POST",
      headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
      },
      body:JSON.stringify({email,otpdata})
  })
  .then(response => {
    // console.log(response);
      return response.json();
    })
    .catch(err => console.log(err));
}
