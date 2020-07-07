import axios from "axios";

const baseUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

export const fetchComparison = async (formData) => {
  return await axios.post(baseUrl + "/api/comparison", formData);
};
