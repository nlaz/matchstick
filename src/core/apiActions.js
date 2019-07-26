import axios from "axios";

const baseUrl = process.env.REACT_APP_SERVER_URL;

export const fetchReport = async (input, output) => {
  try {
    return await axios.post(baseUrl + "/compare", null, {
      params: {
        input,
        output
      }
    });
  } catch (error) {
    console.error(error);
  }
};
