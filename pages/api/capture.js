const prependUrl = require("../../helpers/prependHttp");
const captureWebsite = require("capture-website");
const uploadImage = require("../../helpers/uploadImage");

const options = {
  width: 1440,
  overwrite: true,
  emulateDevice: "iPhone X",
};

const getCapture = async (url) => {
  try {
    return await captureWebsite.file(url, "tmp/capture.png", options);
  } catch (error) {
    throw error;
  }
};

export default async (req, res) => {
  const { url } = req.query;

  try {
    const data = await getCapture(prependUrl(url));
    const image = await uploadImage("tmp/capture.png");
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ url: prependUrl(url), image: image.Location }));
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: error.message }));
  }
};
