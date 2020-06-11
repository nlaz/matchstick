const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

//configuring the AWS environment
// TODO: Regenerate API keys
AWS.config.update({
  accessKeyId: "AKIAJ6JA3WXM244BLRMA",
  secretAccessKey: "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",
});

const s3 = new AWS.S3();

//configuring parameters
const getParams = (filePath) => ({
  Bucket: "matchstick-assets",
  Body: fs.createReadStream(filePath),
  Key: "captures/" + Date.now() + "_" + path.basename(filePath),
  ContentType: "image/png",
  ACL: "public-read-write",
});

module.exports = async (filePath) => {
  const params = getParams(filePath);
  try {
    const data = await s3.upload(params).promise();
    return data;
  } catch (error) {
    console.log("Error", error);
  }
};
