import axios from "axios";
import jwt from "jsonwebtoken";
import { messageInfo, messageError } from "src/utils";
import Swal from "sweetalert2";
import { BASE_URL, GET_USERS, USER_LOGIN } from ".";

export const getUser = () => async (dispatch) => {
  try {
    const user = await axios.get(`${BASE_URL}/auth`);
    dispatch({ type: GET_USERS, data: user.data.data });
  } catch (error) {
    messageError("Ada masalah pada server, silahkan hubungi admin");
  }
};

export const checkUser = (token) => (dispatch) => {
  const decode = jwt.verify(token, "simpeg123");
  dispatch({ type: USER_LOGIN, data: decode });
};

export const LoginUser = (username, password) => async (dispatch) => {
  try {
    const login = await axios.post(`${BASE_URL}/auth/login`, {
      username,
      password,
    });

    if (login.data.status === "Success") {
      localStorage.setItem("token", login.data.data);
      dispatch(checkUser(login.data.data));
    } else {
      messageError(login.data.data);
    }
  } catch (error) {
    messageError("Ada masalah pada server, silahkan hubungi admin");
  }
};

export const userLogOut = () => (dispatch) => {
  try {
    localStorage.removeItem("token");
    // dispatch({ type: USER_LOGOUT });
    document.location.reload();
  } catch (error) {
    console.log(error);
  }
};

export const createUser = (username, password) => async (dispatch) => {
  try {
    const add = await axios.post(`${BASE_URL}/auth/register`, {
      username,
      password,
    });
    if (add.data.status === "Created") {
      messageInfo("success", "Berhasil didaftarkan");
      dispatch(getUser());
    } else {
      messageError(add.data.data);
    }
  } catch (error) {
    messageError("Ada masalah pada server, silahkan hubungi admin");
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    const del = await axios.delete(`${BASE_URL}/auth/hapus/${id}`);
    if (del.data.status === "Deleted") {
      Swal.fire("Deleted!", "User berhasil di hapus.", "success");
      dispatch(getUser());
    }
  } catch (error) {
    messageError("Ada masalah pada server, silahkan hubungi admin");
  }
};

export const resetPassword = (id, username) => async (dispatch) => {
  try {
    const reset = await axios.put(`${BASE_URL}/auth/reset`, { id, username });
    if (reset.data.status === "Updated") {
      Swal.fire("Reset Password!", "Password berhasil di reset.", "success");
      dispatch(getUser());
    }
  } catch (error) {
    messageError("Ada masalah pada server, silahkan hubungi admin");
  }
};
