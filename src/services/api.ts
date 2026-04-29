import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5291/api",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    alert("Bir hata oluştu: " + (error.response?.data?.message || error.message));
    return Promise.reject(error);
  }
)


export default api;