const route = require("express").Router();
const { CutiController } = require("../controllers");

route.post("/", CutiController.AddCuti);
route.delete("/", CutiController.DeleteCuti);
route.get("/pegawai", CutiController.GetPegawaiCuti);

module.exports = route;
