import axios from "axios";

// TODO change server url for development
const baseUrl = "https://matchstick-server.herokuapp.com";

export const fetchComparison = async (formData) => {
  return await axios.post(baseUrl + "/api/comparison", formData);
};
