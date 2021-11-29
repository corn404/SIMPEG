const route = require("express").Router();
const { pegawai } = require("../../db/constant/tableName");
const { UploadController } = require("../controllers");
const { uploadFile } = require("../utils/uploads");

route.get("/check", UploadController.CheckUpload); // ?pegawai=1&pangkat=1
route.get("/check-upload", UploadController.SudahDiUpload);

route.post("/", uploadFile.single("file"), UploadController.UploadBerkas);

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
