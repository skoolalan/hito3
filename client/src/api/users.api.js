import axios from 'axios';
const usersApi = axios.create({
    baseURL: "http://localhost:8000/tasks/api/v1/users/"
  });
  const loginApi = axios.create({
    baseURL: "http://localhost:8000/tasks/api/v1/users"
  });
  export const createUser = (user) => usersApi.post("/", user);

  export const loginUser = (users) => loginApi.post("/", users);


 //export const loginUser = (cuil, password) => {
 //  return usersApi.post("/login/", { cuil, password });
 //};