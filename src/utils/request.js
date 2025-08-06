import axios from "axios";

export const axiosInstance = axios.create();

export const getConfig = async () =>{
    try {
        const response = await axios.get("/app.config.json")
        const baseEndPoint = response.data.baseendpoint;
        axiosInstance.defaults.baseURL = baseEndPoint;
        axiosInstance.interceptors.request.use((config)=>{
            const authData = JSON.parse(localStorage.getItem("auth"));
            if (authData?.token) {
                config.headers.Authorization = `Bearer ${authData.token}`;
              }
              return config;
        })
    } catch (error) {
        console.log("Error in connecting frontend to backend:", error);
    throw error;
    }
}