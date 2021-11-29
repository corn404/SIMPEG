const moment = require("moment");
const { whereBetween } = require("../../db");
const db = require("../../db");
const tableName = require("../../db/constant/tableName");
const WebResponse = require("../utils/WebResponse");

const GetPangkat = async (req, res, next) => {
  try {
    const data = await db(tableName.pangkat);
    return WebResponse(res, 200, "Success", data);
  } catch (error) {
    return next(error);
  }
};

const AddPangkat = async (req, res, next) => {
  const { pangkat, golongan, ruang } = req.body;
  try {
    const data = await db(tableName.pangkat).insert({
      pangkat,
      golongan,
      ruang,
    });

    if (data) {
      return WebResponse(res, 201, "Success", data);
    }
  } catch (error) {
    return next(error);
  }
};

const DelPangkat = async (req, res, next) => {
  const { id } = req.query;
  try {
    const del = await db(tableName.pangkat).where({ id }).delete();
    if (del) {
      return WebResponse(res, 200, "Success", "Hapus Data berhasil");
    }
  } catch (error) {
    return next(error);
  }
};

const GetPangkatById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await db(tableName.pangkat).where({ id });
    return WebResponse(res, 200, "Success", data);
  } catch (error) {
    return next(error);
  }
};

const GetMapPangkat = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await db(tableName.mappingUpload)
      .select("*")
      .where({ id_pangkat: id });

    return WebResponse(res, 200, "Success", data);
  } catch (error) {
    return next(error);
  }
};

const AddMapPangkat = async (req, res, next) => {
  const { id_pangkat, keterangan } = req.body;
  try {
    const add = await db(tableName.mappingUpload).insert({
      id_pangkat,
      keterangan,
    });
    if (add) {
      return WebResponse(res, 201, "Success", add);
    }
  } catch (error) {
    return next(error);
  }
};

const DellMapPangkat = async (req, res, next) => {
  const { id } = req.query;
  try {
    const del = await db(tableName.mappingUpload).where({ id }).delete();

    if (del) {
      return WebResponse(res, 200, "Success", "Hapus Data berhasil");
    }
  } catch (error) {
    return next(error);
  }
};

const NaikPangkat = async (req, res, next) => {
  const { pangkat, pegawai } = req.query;
  try {
    const checkPangkat = await db(tableName.pangkat)
      .select("*")
      .limit(1)
      .offset(pangkat);
    if (checkPangkat.length < 0) {
      return WebResponse(res, 201, "Error", "Anda Suda pada pangkat terakhir");
    } else {
      const data = await db(tableName.pegawai).where("id", pegawai).update({
        id_pangkat: checkPangkat[0].id,
      });

      return WebResponse(res, 200, "Success", "Naik pangkat berhasil");
    }
  } catch (error) {
    return next(error);
  }
};

const TurunPangkat = async (req, res, next) => {
  const { pangkat, pegawai } = req.query;
  try {
    if (pangkat == 1) {
      return WebResponse(res, 201, "Error", "Pangkat anda sudah ter-rendah");
    } else {
      const data = await db(tableName.pegawai).where("id", pegawai).decrement({
        id_pangkat: 1,
      });
      return WebResponse(res, 200, "Success", "Turun pangkat berhasil");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  GetPangkat,
  AddPangkat,
  DelPangkat,
  GetMapPangkat,
  AddMapPangkat,
  DellMapPangkat,
  NaikPangkat,
  TurunPangkat,
};
