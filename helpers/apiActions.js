import axios from "axios";

const baseUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

export const fetchComparison = async (input, output, options) => {
  try {
    return await axios.post(baseUrl + "/api/images", {
      input: input,
      output: output,
      options: options,
    });
  } catch (error) {
    console.error(error);
  }
};
