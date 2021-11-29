const route = require("express").Router();
const { PangkatController } = require("../controllers");

route.post("/", PangkatController.AddPangkat);
route.get("/", PangkatController.GetPangkat);
route.delete("/", PangkatController.DelPangkat);
route.get("/map/:id", PangkatController.GetMapPangkat);
route.post("/map", PangkatController.AddMapPangkat);
route.delete("/map", PangkatController.DellMapPangkat);

route.post("/naik", PangkatController.NaikPangkat);
route.post("/turun", PangkatController.TurunPangkat);

module.exports = route;
