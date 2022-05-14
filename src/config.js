// import { io } from "socket.io-client";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "https://leicon.herokuapp.com/api/v1"
})

//http://localhost:8080/api/v1
// https://leicon.herokuapp.com
// https://leicon.herokuapp.com/api/v1
