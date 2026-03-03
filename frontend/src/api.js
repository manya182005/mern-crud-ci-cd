import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-crud-ci-cd-1.onrender.com/api"
});

export default API;