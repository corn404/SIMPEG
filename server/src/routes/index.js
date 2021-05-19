const express = require("express");
const route = express.Router();

route.use("/pegawai", require("./pegawai"));
route.use("/absensi", require("./absensi"));
route.use("/auth", require("./auth"));

module.exports = route;
