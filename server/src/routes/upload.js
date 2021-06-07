const route = require("express").Router();
const { UploadController } = require("../controllers");
const { uploadFile } = require("../utils/uploads");

route.post(
  "/sertifikasi/:id",
  uploadFile.single("sertifikasi"),
  UploadController.UploadSetifikasi
);
route.post(
  "/riwayat/:id",
  uploadFile.single("sertifikasi"),
  UploadController.UploadRiwayatHidup
);

route.delete("/sertifikasi/:id", UploadController.DeleteSetifikasi);
route.delete("/riwayat/:id", UploadController.DeleteRiwayatHidup);

module.exports = route;
