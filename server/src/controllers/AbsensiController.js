const moment = require("moment");
const { whereBetween } = require("../../db");
const db = require("../../db");
const tableName = require("../../db/constant/tableName");
const WebResponse = require("../utils/WebResponse");

const GetAbsensi = async (req, res, next) => {
  try {
    const pegawai = await db(tableName.pegawai);

    // const rekapHari = await db(tableName.absensi)
    //   .select(
    //     `${tableName.absensi}.id`,
    //     `${tableName.pegawai}.id as id_pegawai`,
    //     `${tableName.absensi}.tgl_absen`,
    //     `${tableName.absensi}.status`
    //   )
    //   .join(
    //     tableName.pegawai,
    //     `${tableName.absensi}.id_pegawai`,
    //     `${tableName.pegawai}.id`
    //   );

    // const hadir = await db(tableName.absensi)
    //   .where({ status: 1 })
    //   .andWhere({ masuk: 1 })
    //   .andWhere({ pulang: 1 })
    //   .select(`${tableName.absensi}.id_pegawai`)
    //   .count(`${tableName.absensi}.id_pegawai`, { as: "hadir" })
    //   .groupBy(`${tableName.absensi}.id_pegawai`);

    // const absen = await db(tableName.absensi)
    //   .where({ status: 2 })
    //   .select(`${tableName.absensi}.id_pegawai`)
    //   .count(`${tableName.absensi}.id_pegawai`, { as: "absen" })
    //   .groupBy(`${tableName.absensi}.id_pegawai`);

    // const dataRekap = pegawai.map((x) => {
    //   const hari = rekapHari.filter((y) => y.id_pegawai === x.id);
    //   const h = hadir.find((y) => y.id_pegawai === x.id);
    //   const a = absen.find((y) => y.id_pegawai === x.id);
    //   return {
    //     id_pegawai: x.id,
    //     nidn: x.nidn,
    //     nama: x.nama,
    //     rekap_hari: hari,
    //     hadir: h,
    //     absen: a,
    //   };
    // });
    return WebResponse(res, 200, "Success", pegawai);
  } catch (error) {
    return next(error);
  }
};

const GetAbsensiByMonth = async (req, res, next) => {
  const { pegawai, bulan } = req.query;
  const year = moment().format("yyyy");

  const blnStart = moment(`${year}-${bulan}-01 00:00:00`)
    .startOf("month")
    .format("yyyy-MM-DD");
  const blnEnd = moment(`${year}-${bulan}-01 00:00:00`)
    .endOf("month")
    .format("yyyy-MM-DD");
  try {
    const data = await db(tableName.absensi)
      // .whereRaw(db.raw(`MONTH(${tableName.absensi}.tgl_absen) = ?`, [bulan]))
      .whereBetween(`${tableName.absensi}.tgl_absen`, [blnStart, blnEnd])
      .andWhere({ id_pegawai: pegawai });

    const hadir = await db(tableName.absensi)
      // .whereRaw(db.raw(`MONTH(${tableName.absensi}.tgl_absen) = ?`, [bulan]))
      .whereBetween(`${tableName.absensi}.tgl_absen`, [blnStart, blnEnd])
      .andWhere({ status: 1 })
      // .andWhere({ masuk: 1 })
      // .andWhere({ pulang: 1 })
      .andWhere({ id_pegawai: pegawai })
      .select(`${tableName.absensi}.id_pegawai`)
      .count(`${tableName.absensi}.id_pegawai`, { as: "hadir" })
      .groupBy(`${tableName.absensi}.id_pegawai`);

    const absen = await db(tableName.absensi)
      // .whereRaw(db.raw(`MONTH(${tableName.absensi}.tgl_absen) = ?`, [bulan]))
      .whereBetween(`${tableName.absensi}.tgl_absen`, [blnStart, blnEnd])
      .andWhere({ status: 2 })
      .andWhere({ id_pegawai: pegawai })
      .select(`${tableName.absensi}.id_pegawai`)
      .count(`${tableName.absensi}.id_pegawai`, { as: "absen" })
      .groupBy(`${tableName.absensi}.id_pegawai`);

    const dataRekap = {
      rekap: data,
      hadir: hadir.length > 0 ? hadir[0] : { id_pegawai: null, hadir: null },
      absen: absen.length > 0 ? absen[0] : { id_pegawai: null, absen: null },
    };

    return WebResponse(res, 200, "Success", dataRekap);
  } catch (error) {
    return next(error);
  }
};

const CreateAbensi = async (req, res, next) => {
  const { id_pegawai } = req.params;
  const tanggal = moment().format("yyyyMMDD");
  try {
    // pengecekan apakah sudah melakukan absen sebelumnya
    const checkData = await db(tableName.absensi)
      .where({
        id_pegawai: id_pegawai,
      })
      .orderBy("id", "desc")
      .limit(1);

    // jika jam sekarang kurang dari jam 6 maka tidak bisa melakukan absen
    if (moment().locale("id").format("HH") < 6) {
      return WebResponse(res, 201, "Error", "Absensi akan dibuka pukul 06:00");
    }

    if (checkData.length > 0) {
      // pengecekan apakah tgl absen terakhir sama dengan tanggal hari ini
      if (moment(checkData[0].tgl_absen).format("yyyyMMDD") === tanggal) {
        if (checkData[0].masuk === 0) {
          return WebResponse(res, 201, "Error", "Status anda tidak hadir");
        }

        // jika jam sekarang lebih kecil dari pukul 14
        if (moment().locale("id").format("HH") < 14) {
          return WebResponse(
            res,
            201,
            "Error",
            "Anda sudah melakukan absen silahkan melakukan absen pulang pada pukul 14:00"
          );
        } else {
          const update = await db(tableName.absensi)
            .update({
              pulang: 1,
            })
            .where({ id: checkData[0].id });
          return WebResponse(res, 201, "Created", "Success", update);
        }
      } else {
        const add = await db(tableName.absensi).insert({
          id_pegawai,
          masuk: 1,
          tgl_absen: moment().format("yyyy-MM-DD HH:mm:ss"),
        });

        return WebResponse(res, 201, "Created", "Success", add);
      }
    } else {
      if (moment().locale("id").format("HH") > 10) {
        return WebResponse(
          res,
          201,
          "Error",
          "Anda sudah tidak bisa melakukan absen, batas melakukan absensi yaitu jam 06:00 sampai jam 10:00"
        );
      } else {
        const add = await db(tableName.absensi).insert({
          id_pegawai,
          masuk: 1,
          tgl_absen: moment().format("yyyy-MM-DD HH:mm:ss"),
        });

        return WebResponse(res, 201, "Created", "Success", add);
      }
    }
  } catch (error) {
    return next(error);
  }
};

const GetAbsensiByPegawai = async (req, res, next) => {
  const { pegawai, bulan } = req.query;
  const year = moment().format("yyyy");

  const blnStart = moment(`${year}-${bulan}-01 00:00:00`)
    .startOf("month")
    .format("yyyy-MM-DD");
  const blnEnd = moment(`${year}-${bulan}-01 00:00:00`)
    .endOf("month")
    .format("yyyy-MM-DD");
  try {
    const data = await db(tableName.absensi)
      .select(
        `${tableName.absensi}.id`,
        `${tableName.absensi}.tgl_absen`,
        `${tableName.absensi}.id_pegawai`,
        `${tableName.absensi}.status`,
        `${tableName.pegawai}.nidn`,
        `${tableName.pegawai}.nama`,
        `${tableName.pegawai}.kelamin`,
        `${tableName.pegawai}.pendidikan`,
        `${tableName.pegawai}.id_jabatan`,
        `${tableName.pegawai}.no_hp`
      )
      .join(
        tableName.pegawai,
        `${tableName.absensi}.id_pegawai`,
        `${tableName.pegawai}.id`
      )
      .where({ id_pegawai: pegawai })
      // .whereRaw(`MONTH(${tableName.absensi}.tgl_absen) = ?`, [bulan])
      .whereBetween(`${tableName.absensi}.tgl_absen`, [blnStart, blnEnd])
      .orderBy("id", "asc");
    return WebResponse(res, 200, "Success", data);
  } catch (error) {
    return next(error);
  }
};

const ScanAbsensi = async (req, res, next) => {
  const { token, id } = req.query;
  try {
    req.io.sockets.emit("scan", { id, token });
    return WebResponse(res, 201, "Success");
  } catch (error) {
    return next(error);
  }
};

const ScanVerify = async (req, res, next) => {
  const { id } = req.params;
  try {
    req.io.sockets.emit("scan-success", id);
    return WebResponse(res, 201, "Success");
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  GetAbsensi,
  CreateAbensi,
  GetAbsensiByPegawai,
  ScanAbsensi,
  ScanVerify,
  GetAbsensiByMonth,
};
