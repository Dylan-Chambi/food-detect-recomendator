import axios from 'axios';

const backendAPI = axios.create({
  baseURL: "https://food-detect-recomendator-547kwfnkdq-uc.a.run.app",
});

export default backendAPI;
