const createFormData = (url, upload, options) => {
  const opts = { ...options };
  if (opts.emulateDevice === "Desktop HD") {
    delete opts.emulateDevice;
  } else if (opts.emulateDevice === "Custom - Use mockup dimensions") {
    delete opts.emulateDevice;
  }
  if (Object.keys(opts.file).length > 0) {
    delete opts.file;
  }

  const formData = new FormData();
  formData.append("url", url);
  formData.append("upload", upload.file);
  formData.append("options", JSON.stringify(opts));
  return formData;
};

export default createFormData;
