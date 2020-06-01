const prependUrl = require("../../helpers/prependHttp");
const captureWebsite = require("capture-website");

const options = {
  width: 1440,
  overwrite: true,
  emulateDevice: "iPhone X"
};

const getCapture = async url => {
  try {
    return await captureWebsite.base64(url, "tmp/capture.png", options);
  } catch (error) {
    throw error;
  }
};

export default async (req, res) => {
  const { url } = req.query;

  try {
    const image = await getCapture(prependUrl(url));
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ url: prependUrl(url), image: image }));
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: error.message }));
  }
};
