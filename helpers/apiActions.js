import axios from "axios";

const baseUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

export const fetchComparison = async (input, output, options) => {
  if (options.emulateDevice === "Desktop HD") {
    delete options.emulateDevice;
  }
  console.log(output);
  return await axios.post(baseUrl + "/api/comparison", output);
};
