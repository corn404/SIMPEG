const moment = require("moment");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../db");
const tableName = require("../../db/constant/tableName");
const WebResponse = require("../utils/WebResponse");

const GetUser = async (req, res, next) => {
  try {
    const data = await db(tableName.users).where({ role: "admin" });
    return WebResponse(res, 200, "Success", data);
  } catch (error) {
    return next(error);
  }
};

const CreateUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const checkUsername = await db(tableName.users).where({ username });
    if (checkUsername.length > 0) {
      return WebResponse(res, 201, "Error", "Username sudah terdaftar");
    }

    const salt = await bcrypt.genSaltSync(12);
    const hassPassword = await bcrypt.hashSync(password, salt);

    const add = await db(tableName.users).insert({
      username,
      password: hassPassword,
      id_pegawai: 0,
      role: "admin",
    });

    if (add) {
      return WebResponse(res, 201, "Created", add);
    }
  } catch (error) {
    return next(error);
  }
};

const LoginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const checkUsername = await db(tableName.users)
      .where({ username })
      .andWhere({ role: "admin" });
    if (checkUsername.length > 0) {
      const checkPass = await bcrypt.compare(
        password,
        checkUsername[0].password
      );
      if (checkPass) {
        const dataUser = {
          id: checkUsername[0].id,
          username: checkUsername[0].username,
          role: checkUsername[0].role,
          status: checkUsername[0].status,
        };
        const token = await jwt.sign({ ...dataUser }, "simpeg123");
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

const DeleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const del = await db(tableName.users).where({ id }).del();
    if (del) {
      return WebResponse(res, 200, "Deleted", del);
    }
  } catch (error) {
    return next(error);
  }
};

const ResetPassword = async (req, res, next) => {
  const { id, username } = req.body;
  try {
    const salt = await bcrypt.genSaltSync(12);
    const password = await bcrypt.hashSync(username, salt);
    const reset = await db(tableName.users)
      .update({
        password,
      })
      .where({ id });
    if (reset) {
      return WebResponse(res, 200, "Updated", reset);
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { GetUser, CreateUser, LoginUser, DeleteUser, ResetPassword };
