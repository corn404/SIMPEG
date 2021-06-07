const db = require("../../db");
const tableName = require("../../db/constant/tableName");
const WebResponse = require("../utils/WebResponse");

const UploadSetifikasi = async (req, res, next) => {
  const { id } = req.params;
  try {
    const update = await db(tableName.pegawai)
      .update({ sertifikasi: req.file.filename })
      .where({ id });
    return WebResponse(res, 200, "Success", req.file.filename);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const UploadRiwayatHidup = async (req, res, next) => {
  const { id } = req.params;
  try {
    const update = await db(tableName.pegawai)
      .update({ riwayat_hidup: req.file.filename })
      .where({ id });
    return WebResponse(res, 200, "Success", req.file.filename);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const DeleteSetifikasi = async (req, res, next) => {
  const { id } = req.params;
  try {
    const update = await db(tableName.pegawai)
      .update({ sertifikasi: null })
      .where({ id });
    return WebResponse(res, 200, "Success");
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const DeleteRiwayatHidup = async (req, res, next) => {
  const { id } = req.params;
  try {
    const update = await db(tableName.pegawai)
      .update({ riwayat_hidup: null })
      .where({ id });
    return WebResponse(res, 200, "Success");
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = {
  UploadSetifikasi,
  UploadRiwayatHidup,
  DeleteRiwayatHidup,
  DeleteSetifikasi,
};