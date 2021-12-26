const moment = require("moment");
const db = require("../../db");
const tableName = require("../../db/constant/tableName");
const WebResponse = require("../utils/WebResponse");

const AddCuti = async (req, res, next) => {
  const { id_pegawai, mulai_cuti, akhir_cuti } = req.body;
  try {
    const checkTanggal = await db(tableName.cuti)
      .select("*")
      .where({ id_pegawai: id_pegawai.value })
      .orderBy("id", "desc")
      .limit(1);

    if (checkTanggal.length > 0) {
      console.log("check tanggal");
      const checkCuti = await db(tableName.cuti)
        .select("*")
        .where({ id_pegawai: id_pegawai.value })
        .whereBetween("mulai_cuti", [
          moment(checkTanggal[0].mulai_cuti).format("YYYY-MMDD"),
          akhir_cuti,
        ])
        .orWhereBetween("akhir_cuti", [
          moment(checkTanggal[0].mulai_cuti).format("YYYY-MMDD"),
          akhir_cuti,
        ]);

      if (checkCuti.length > 0) {
        console.log("check cuti");
        return WebResponse(
          res,
          201,
          "Error",
          `Pegawai ini masih dalam masas cuti, sampai dengan ${moment(
            checkCuti[0].akhir_cuti
          ).format("DD MMMM YYYY")}`
        );
      }
    }

    var dataArr = [];
    let loop = new Date(mulai_cuti);
    let end = new Date(akhir_cuti);
    while (loop <= end) {
      dataArr.push({
        id_pegawai: id_pegawai.value,
        status: 0,
        tgl_absen: moment(loop).format("yyyy-MM-DD"),
      });
      let newDate = loop.setDate(loop.getDate() + 1);
      loop = new Date(newDate);
    }

    await db.transaction(async (trx) => {
      await db(tableName.absensi).insert(dataArr).transacting(trx);

      await db(tableName.cuti)
        .insert({
          id_pegawai: id_pegawai.value,
          mulai_cuti,
          akhir_cuti,
        })
        .transacting(trx);

      await db(tableName.pegawai)
        .update({ status_cuti: "Y" })
        .where({ id: id_pegawai.value })
        .transacting(trx);
      return WebResponse(res, 201, "Success", "Cuti berhasil di buat");
    });

    // return WebResponse(res, 201, "Success", req.body);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const DeleteCuti = async (req, res, next) => {
  const { id, pegawai } = req.query;
  console.log(req.query);
  try {
    await db.transaction(async (trx) => {
      await db(tableName.cuti).where({ id }).delete().transacting(trx);
      await db(tableName.pegawai)
        .where({ id: pegawai })
        .update({ status_cuti: "N" });
      return WebResponse(res, 200, "Success", "Data berhasil di hapus!");
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const GetPegawaiCuti = async (req, res, next) => {
  try {
    const data = await db(tableName.cuti)
      .select(
        `${tableName.cuti}.id`,
        `${tableName.cuti}.id_pegawai`,
        `${tableName.cuti}.mulai_cuti`,
        `${tableName.cuti}.akhir_cuti`,
        `${tableName.pegawai}.nidn`,
        `${tableName.pegawai}.nama`,
        `${tableName.pegawai}.pendidikan`,
        `${tableName.pegawai}.no_hp`,
        `${tableName.pegawai}.status_cuti`,
        `${tableName.pegawai}.id_jabatan`,
        `${tableName.jabatan}.jabatan`
      )
      .join(
        tableName.pegawai,
        `${tableName.cuti}.id_pegawai`,
        `${tableName.pegawai}.id`
      )
      .join(
        tableName.jabatan,
        `${tableName.pegawai}.id_jabatan`,
        `${tableName.jabatan}.id`
      )
      .orderBy(`${tableName.cuti}.id`, "desc");

    return WebResponse(res, 200, "Success", data);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  AddCuti,
  GetPegawaiCuti,
  DeleteCuti,
};
