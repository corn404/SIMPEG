const route = require("express").Router();
const { AbsensiController } = require("../controllers");

route.get("/", AbsensiController.GetAbsensi);
route.get("/rekap", AbsensiController.GetAbsensiByMonth);
route.get("/scan", AbsensiController.ScanAbsensi);
route.get("/scan-verify/:id", AbsensiController.ScanVerify);
route.get("/pegawai", AbsensiController.GetAbsensiByPegawai);
route.post("/:id_pegawai", AbsensiController.CreateAbensi);

module.exports = route;
