import axios from 'axios';

const apiClient = axios.create({
  // Replace this with your actual Render backend URL
  baseURL: 'https://flavorverse-api.onrender.com', 
});

export default apiClient;