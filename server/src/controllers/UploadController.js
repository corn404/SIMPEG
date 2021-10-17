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

const CheckUpload = async (req, res, next) => {
  const { pegawai, pangkat } = req.query;
  try {
    const dataUpload = await db(tableName.mappingUpload)
      .select(
        `${tableName.mappingUpload}.id_pangkat`,
        `${tableName.mappingUpload}.keterangan`,
        `${tableName.tampungUpload}.nama_file`,
        `${tableName.tampungUpload}.id_pegawai`
      )
      .leftJoin(
        tableName.tampungUpload,
        `${tableName.mappingUpload}.id`,
        `${tableName.tampungUpload}.id_mapping`
      )
      .where(`${tableName.tampungUpload}.id_pegawai`, pegawai)
      .andWhere(`${tableName.mappingUpload}.id_pangkat`, pangkat);

    if (dataUpload.length < 0) {
      return WebResponse(res, 200, "Belum Upload");
    }

    const dataMapping = await db(tableName.mappingUpload)
      .select("*")
      .where("id_pangkat", pangkat);

    if (dataUpload.length >= dataMapping.length) {
      return WebResponse(res, 200, "Belum Selesai");
    } else {
      return WebResponse(res, 200, "Belum Upload");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  UploadSetifikasi,
  UploadRiwayatHidup,
  DeleteRiwayatHidup,
  DeleteSetifikasi,
  CheckUpload,
};
