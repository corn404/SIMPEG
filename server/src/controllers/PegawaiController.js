const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../db");
const tableName = require("../../db/constant/tableName");
const WebResponse = require("../utils/WebResponse");

const TambahPegawai = async (req, res, next) => {
  const { nip, nama, kelamin, pendidikan, jabatan, no_hp } = req.body;
  try {
    const salt = await bcrypt.genSaltSync(12);
    const passwordHash = await bcrypt.hashSync(nip, salt);
    const checkNip = await db(tableName.pegawai).where({ nip });
    if (checkNip.length > 0) {
      return WebResponse(res, 201, "Error", "NIP sudah terdaftar");
    }
    const add = await db(tableName.pegawai).insert({
      nip,
      nama,
      kelamin,
      pendidikan,
      jabatan,
      no_hp,
    });

    if (add) {
      const createUser = await db(tableName.users).insert({
        username: nip,
        password: passwordHash,
        role: "user",
        id_pegawai: add[0],
      });

      if (createUser) {
        return WebResponse(res, 201, "Created", add);
      }
    }
  } catch (error) {
    return next(error);
  }
};

const GetPegawai = async (req, res, next) => {
  try {
    const data = await db(tableName.pegawai).select("*");
    return WebResponse(res, 200, "Success", data);
  } catch (error) {
    return next(error);
  }
};

const PegawaiLogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const checkUser = await db(tableName.users).where({ username });
    if (checkUser.length > 0) {
      const checkPass = await bcrypt.compareSync(
        password,
        checkUser[0].password
      );
      if (checkPass) {
        const getPegawai = await db(tableName.users)
          .select(
            `${tableName.users}.id`,
            `${tableName.users}.role`,
            `${tableName.users}.status`,
            `${tableName.users}.id_pegawai`,
            `${tableName.pegawai}.nip`,
            `${tableName.pegawai}.nama`,
            `${tableName.pegawai}.kelamin`,
            `${tableName.pegawai}.pendidikan`,
            `${tableName.pegawai}.jabatan`,
            `${tableName.pegawai}.no_hp`
          )
          .join(
            tableName.pegawai,
            `${tableName.users}.id_pegawai`,
            `${tableName.pegawai}.id`
          )
          .where({ id_pegawai: checkUser[0].id_pegawai });

        // const data = { ...getPegawai[0] };

        const token = await jwt.sign({ ...getPegawai[0] }, "7qvt6t2738");

        return WebResponse(res, 200, "Success", token);
      } else {
        return WebResponse(
          res,
          200,
          "Error",
          "Username atau password anda salah"
        );
      }
    } else {
      return WebResponse(res, 200, "Error", "Username tidak terdaftar");
    }
  } catch (error) {
    return next(error);
  }
};

const DeletePegawai = async (req, res, next) => {
  const { id } = req.params;
  try {
    const del = await db(tableName.pegawai).where({ id }).del();
    if (del) {
      const user = await db(tableName.users)
        .where({ role: "user" })
        .andWhere({ id_pegawai: id })
        .del();
      if (user) {
        return WebResponse(res, 200, "Deleted", user);
      }
    }
  } catch (error) {
    return next(error);
  }
};

const ResetPassword = async (req, res, next) => {
  const { id, nip } = req.body;
  try {
    const salt = await bcrypt.genSaltSync(12);
    const password = await bcrypt.hashSync(nip, salt);
    const reset = await db(tableName.users)
      .update({ password })
      .where({ role: "user" })
      .andWhere({ id_pegawai: id });
    if (reset) {
      return WebResponse(res, 200, "Updated", reset);
    }
  } catch (error) {
    return next(error);
  }
};

const UpdatePegawai = async (req, res, next) => {
  const { id, nama, kelamin, pendidikan, jabatan, no_hp } = req.body;
  try {
    const update = await db(tableName.pegawai)
      .update({
        nama,
        kelamin,
        pendidikan,
        jabatan,
        no_hp,
      })
      .where({ id });
    if (update) {
      return WebResponse(res, 200, "Updated", update);
    }
  } catch (error) {
    return next(error);
  }
};

const UpdatePassword = async (req, res, next) => {
  const { id_pegawai, password } = req.body;
  try {
    const salt = await bcrypt.genSaltSync(12);
    const passwordHash = await bcrypt.hashSync(password, salt);
    const update = await db(tableName.users)
      .update({ password: passwordHash })
      .where({ role: "user" })
      .andWhere({ id_pegawai });

    if (update) {
      return WebResponse(res, 200, "Updated");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  TambahPegawai,
  GetPegawai,
  PegawaiLogin,
  DeletePegawai,
  ResetPassword,
  UpdatePegawai,
  UpdatePassword,
};
