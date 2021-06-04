const route = require("express").Router();
const { JabatanController } = require("../controllers");

route.get("/", JabatanController.GetJabatan);
route.post("/", JabatanController.CreateJabatan);
route.delete("/:id", JabatanController.HapusJabatan);

module.exports = route;
