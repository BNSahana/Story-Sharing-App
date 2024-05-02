import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${backendUrl}/api/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${backendUrl}/api/auth/login`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const validateToken = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/auth/validate`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
