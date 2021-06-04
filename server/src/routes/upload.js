const route = require("express").Router();
const { UploadController } = require("../controllers");
const { uploadFile } = require("../utils/uploads");

route.post(
  "/sertifikasi/:id",
  uploadFile.single("sertifikasi"),
  UploadController.UploadSetifikasi
);

module.exports = route;
