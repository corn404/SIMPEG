const moment = require("moment");
const db = require("../../db");
const tableName = require("../../db/constant/tableName");
const WebResponse = require("../utils/WebResponse");

const GetAbsensi = async (req, res, next) => {
  try {
    const pegawai = await db(tableName.pegawai);

    const rekapHari = await db(tableName.absensi)
      .select(
        `${tableName.absensi}.id`,
        `${tableName.pegawai}.id as id_pegawai`,
        `${tableName.absensi}.tgl_absen`,
        `${tableName.absensi}.status`
      )
      .join(
        tableName.pegawai,
        `${tableName.absensi}.id_pegawai`,
        `${tableName.pegawai}.id`
      );

    const hadir = await db(tableName.absensi)
      .where({ status: 1 })
      .select(`${tableName.absensi}.id_pegawai`)
      .count(`${tableName.absensi}.id_pegawai`, { as: "hadir" })
      .groupBy(`${tableName.absensi}.id_pegawai`);

    const absen = await db(tableName.absensi)
      .where({ status: 2 })
      .select(`${tableName.absensi}.id_pegawai`)
      .count(`${tableName.absensi}.id_pegawai`, { as: "absen" })
      .groupBy(`${tableName.absensi}.id_pegawai`);

    const dataRekap = pegawai.map((x) => {
      const hari = rekapHari.filter((y) => y.id_pegawai === x.id);
      const h = hadir.find((y) => y.id_pegawai === x.id);
      const a = absen.find((y) => y.id_pegawai === x.id);
      return {
        id_pegawai: x.id,
        nip: x.nip,
        nama: x.nama,
        rekap_hari: hari,
        hadir: h,
        absen: a,
      };
    });
    return WebResponse(res, 200, "Success", dataRekap);
  } catch (error) {
    return next(error);
  }
};

const CreateAbensi = async (req, res, next) => {
  const { id_pegawai } = req.params;
  const tanggal = moment().format("yyyyMMDD");
  try {
    const checkData = await db(tableName.absensi)
      .where({
        id_pegawai: id_pegawai,
      })
      .orderBy("id", "desc")
      .limit(1);

    if (checkData.length > 0) {
      if (moment(checkData[0].tgl_absen).format("yyyyMMDD") === tanggal) {
        return WebResponse(res, 201, "Error", "Anda sudah melakukan absen");
      } else {
        const add = await db(tableName.absensi).insert({
          id_pegawai,
          tgl_absen: moment().format("yyyy-MM-DD HH:mm:ss"),
        });

        return WebResponse(res, 201, "Created", "Success", add);
      }
    } else {
      const add = await db(tableName.absensi).insert({
        id_pegawai,
        tgl_absen: moment().format("yyyy-MM-DD HH:mm:ss"),
      });

      return WebResponse(res, 201, "Created", "Success", add);
    }
  } catch (error) {
    return next(error);
  }
};

const GetAbsensiByPegawai = async (req, res, next) => {
  const { pegawai, bulan } = req.query;
  try {
    const data = await db(tableName.absensi)
      .select(
        `${tableName.absensi}.id`,
        `${tableName.absensi}.tgl_absen`,
        `${tableName.absensi}.id_pegawai`,
        `${tableName.absensi}.status`,
        `${tableName.pegawai}.nip`,
        `${tableName.pegawai}.nama`,
        `${tableName.pegawai}.kelamin`,
        `${tableName.pegawai}.pendidikan`,
        `${tableName.pegawai}.jabatan`,
        `${tableName.pegawai}.no_hp`
      )
      .join(
        tableName.pegawai,
        `${tableName.absensi}.id_pegawai`,
        `${tableName.pegawai}.id`
      )
      .where({ id_pegawai: pegawai })
      .whereRaw(`MONTH(${tableName.absensi}.tgl_absen) = ?`, [bulan])
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
};
