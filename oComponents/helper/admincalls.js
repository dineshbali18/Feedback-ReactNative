import { API } from "../../backend";

export const giveTenVotes=(userId,token)=>{
    return fetch(`${API}/user/${userId}/admin/user/updatevotes`,{
        method:'GET',
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}