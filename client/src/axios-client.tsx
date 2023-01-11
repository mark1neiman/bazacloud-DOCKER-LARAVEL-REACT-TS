import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const axiosClient: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
        config.headers = config.headers || {};
        (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
})

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('ACCESS_TOKEN')
        } else if (error.response?.status === 404) {
            //...midagi veel viisata
        }
        throw error;
    }
)

export default axiosClient;
