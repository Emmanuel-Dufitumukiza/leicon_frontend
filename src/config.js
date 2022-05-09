// import { io } from "socket.io-client";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "https://leicon.herokuapp.com/api/v1"
})

//http://localhost:8080
// https://leicon.herokuapp.com