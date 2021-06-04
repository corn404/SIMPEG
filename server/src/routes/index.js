const express = require("express");
const route = express.Router();

route.use("/pegawai", require("./pegawai"));
route.use("/absensi", require("./absensi"));
route.use("/auth", require("./auth"));
route.use("/jabatan", require("./jabatan"));
route.use("/upload", require("./upload"));

module.exports = route;
