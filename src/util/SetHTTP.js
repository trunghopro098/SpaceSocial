
// import {API_URL} from "@env"
import { API_URL } from "./config"
export const SetHTTP = (urlImage)=>{
    if(urlImage.includes('http')){
        // console.log(urlImage)
        return urlImage
    }else{
        // console.log(API_URL+urlImage)
        return API_URL+urlImage
    }
}
