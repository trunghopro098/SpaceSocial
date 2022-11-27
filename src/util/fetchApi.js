// import {API_URL} from "@env";
// console.log(API_URL);
// const API_URL = 'http://192.168.43.91:3001' // real device
export const API_URL = 'http://192.168.1.36:3001' // simualator device
export const getAPI = async(url)=>{
    // console.log(API_URL)
    const res = await fetch(API_URL+url)
    .then((response)=>response.json())
    .then((responseJson)=>{
        return responseJson;
    })
    .catch((err)=>{
        console.log(err);
    })
    return res;
}

export const postDataAPI = async(url,data)=>{
    // console.log(API_URL)
    const res = await fetch(API_URL+url,{
        method:'POST',
        headers:{
            "Accept":'application/json',
            "Content-Type":'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response)=>response.json())
    .then((responseJson)=>{
        return responseJson;
    })
    .catch((err)=>{
        console.log(err)
    })
    return res;
}