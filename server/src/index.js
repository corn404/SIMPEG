const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const consola = require("consola");
const moment = require("moment");
// const fileupload = require("express-fileupload");
const multer = require("multer");
const volleyball = require("volleyball");
const CronJob = require("cron").CronJob;
const db = require("../db");

const WebResponse = require("./utils/WebResponse");
const tableName = require("../db/constant/tableName");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 5001;
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(morgan("dev"));
app.use(volleyball);
// app.use(fileupload());

io.on("connection", (socket) => {
  consola.success("Client Connection", socket.id);
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/v1", require("./routes"));

function notFound(req, res, next) {
  res.status(404);
  const error = new Error("Not Found - " + req.originUrl);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  return WebResponse(res, res.statusCode, err.message, err.stack);
}

app.use(notFound);
app.use(errorHandler);

server.listen(PORT, () => {
  const job = new CronJob(
    "* 59 * * * *",
    async () => {
      // console.log(
      //   parseInt(moment("2021-06-07T20:25:08.523Z").locale("id").format("HH"))
      // );
      // pengecekan hari libur pada hari sabtu dan minggu
      if (
        moment().locale("id").format("dddd") === "Sabtu" ||
        moment().locale("id").format("dddd") === "Minggu"
      ) {
        // const getAbsen = await db(tableName.absensi).whereBetween(
        //   db.raw("DATE(tgl_absen)"),
        //   [tanggal, tanggal]
        // );
        const pegawai = await db(tableName.pegawai);
        const pegawaiAdd = pegawai.map((x) => {
          return {
            id_pegawai: x.id,
            tgl_absen: moment().format("yyyy-MM-DD HH:mm:ss"),
            status: 3,
          };
        });

        await db(tableName.absensi).insert(pegawaiAdd);
      } else {
        const tanggal = moment().format("yyyy-MM-DD");
        var dataArr = [];
        const getAbsen = await db(tableName.absensi).whereBetween(
          db.raw("DATE(tgl_absen)"),
          [tanggal, tanggal]
        );

        getAbsen.map((x) => {
          dataArr.push(x.id_pegawai);
        });

        if (dataArr.length > 0) {
          const getPegawai = await db(tableName.pegawai).whereNotIn(
            "id",
            dataArr
          );

          const dataAdd = getPegawai.map((x) => {
            return {
              id_pegawai: x.id,
              tgl_absen: moment().format("yyyy-MM-DD HH:mm:ss"),
              status: 2,
            };
          });
          await db(tableName.absensi).insert(dataAdd);
        }
      }
    },
    null,
    true,
    "Asia/Makassar"
  );
  job.start();
  consola.success(`SERVER READY IN PORT ${PORT}`);
});
