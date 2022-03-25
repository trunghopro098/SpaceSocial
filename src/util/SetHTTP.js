
import {API_URL} from "@env"
// const API_URL  = 'http://192.168.43.41:5000'
export const SetHTTP = (urlImage)=>{
    if(urlImage.includes('http')){
        // console.log(urlImage)
        return urlImage
    }else{
        // console.log(API_URL+urlImage)
        return API_URL+urlImage
    }
}
