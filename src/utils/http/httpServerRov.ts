import axios from "axios";


const httpServerRov = axios.create({
    baseURL: process.env.NODE_ENV === "development" ?  "http://localhost:399/" : "http://localhost:399/" ,
    withCredentials: true
})

export default httpServerRov;