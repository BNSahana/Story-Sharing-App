import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getPostDetails = async (id) => {
  try {
    const response = await axios.get(`${backendUrl}/story/postDetails/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch post details");
  }
};

export const addStory = async (postData) => {
  try {
    const response = await axios.post(`${backendUrl}/story/add`, postData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to add story");
  }
};

export const editStory = async (id, payload) => {
  try {
    const response = await axios.put(
      `${backendUrl}/story/edit/${id}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to edit story");
  }
};
