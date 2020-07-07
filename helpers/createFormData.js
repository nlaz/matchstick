const createFormData = (url, upload, options) => {
  if (options.emulateDevice === "Desktop HD") {
    delete options.emulateDevice;
  }

  const formData = new FormData();
  formData.append("url", url);
  formData.append("upload", upload.file);
  formData.append("options", options);
  return formData;
};

export default createFormData;
