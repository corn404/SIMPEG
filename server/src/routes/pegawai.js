const route = require("express").Router();
const { PegawaiController } = require("../controllers");

route.get("/", PegawaiController.GetPegawai);
route.put("/", PegawaiController.UpdatePegawai);
route.put("/update", PegawaiController.UpdatePassword);
route.post("/", PegawaiController.TambahPegawai);
route.put("/reset", PegawaiController.ResetPassword);
route.post("/login", PegawaiController.PegawaiLogin);
route.delete("/:id", PegawaiController.DeletePegawai);

module.exports = route;
