import axios from "axios";

const baseUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

export const fetchComparison = async (input, output) => {
  try {
    return await axios.post(baseUrl + "/api/images", null, {
      params: { input, output },
    });
  } catch (error) {
    console.error(error);
  }
};
