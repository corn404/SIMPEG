const db = require("../../db");
const tableName = require("../../db/constant/tableName");
const WebResponse = require("../utils/WebResponse");

const GetJabatan = async (req, res, next) => {
  try {
    const get = await db(tableName.jabatan).select("*");
    return WebResponse(res, 200, "Success", get);
  } catch (error) {
    return next(error);
  }
};

const CreateJabatan = async (req, res, next) => {
  const { jabatan } = req.body;
  try {
    const add = await db(tableName.jabatan).insert({ jabatan });
    if (add) {
      return WebResponse(res, 201, "Created");
    }
  } catch (error) {
    return next(error);
  }
};

const HapusJabatan = async (req, res, next) => {
  const { id } = req.params;
  try {
    const del = await db(tableName.jabatan).where({ id }).del();
    if (del) {
      return WebResponse(res, 200, "Deleted");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { GetJabatan, CreateJabatan, HapusJabatan };
