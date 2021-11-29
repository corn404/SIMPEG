import axios from "axios";
import moment from "moment";
import { messageError, messageSuccess } from "src/utils";
// import Swal from "sweetalert2";
import { BASE_URL, GET_MAP_PANGKAT, GET_PANGKAT } from ".";
import { getPegawai } from "./pegawai";

export const addPangkat = (data) => async (dispatch) => {
  try {
    const add = await axios.post(`${BASE_URL}/pangkat`, data);
    if (add.data.status === "Success") {
      messageSuccess("Success");
      dispatch(getPangkat());
    }
  } catch (error) {
    messageError("Ada masalah pada server, silahkan hubungi admin");
  }
};

export const getPangkat = () => async (dispatch) => {
  try {
    const get = await axios.get(`${BASE_URL}/pangkat`);
    if (get.data.status === "Success") {
      dispatch({ type: GET_PANGKAT, data: get.data.data });
    }
  } catch (error) {
    messageError("Ada masalah pada server, silahkan hubungi admin");
  }
};

export const hapusPangkat = (id) => async (dispatch) => {
  try {
    const add = await axios.delete(`${BASE_URL}/pangkat?id=${id}`);
    if (add.data.status === "Success") {
      messageSuccess("Success");
      dispatch(getPangkat());
    }
  } catch (error) {
    messageError("Ada masalah pada server, silahkan hubungi admin");
  }
};

export const getMapPangkat = (id) => async (dispatch) => {
  try {
    const get = await axios.get(`${BASE_URL}/pangkat/map/${id}`);
    if (get.data.status === "Success") {
      dispatch({ type: GET_MAP_PANGKAT, data: get.data.data });
    }
  } catch (error) {
    messageError("Ada masalah pada server, silahkan hubungi admin");
  }
};

export const addMapPangkat = (data) => async (dispatch) => {
  try {
    const add = await axios.post(`${BASE_URL}/pangkat/map`, data);
    if (add.data.status === "Success") {
      messageSuccess("Success");
      dispatch(getMapPangkat(data.id_pangkat));
    }
  } catch (error) {
    messageError("Ada masalah pada server, silahkan hubungi admin");
  }
};

export const hapusMapPangkat = (id, idPangkat) => async (dispatch) => {
  try {
    const dell = await axios.delete(`${BASE_URL}/pangkat/map?id=${id}`);
    if (dell.data.status === "Success") {
      messageSuccess("Success");
      dispatch(getMapPangkat(idPangkat));
    }
  } catch (error) {
    messageError("Ada masalah pada server, silahkan hubungi admin");
  }
};

export const naikPangkat = (pangkat, pegawai) => async (dispatch) => {
  try {
    const rest = await axios.post(
      `${BASE_URL}/pangkat/naik?pangkat=${pangkat}&pegawai=${pegawai}`
    );
    if (rest.data.status === "Success") {
      messageSuccess("Success");
      dispatch(getPegawai());
    } else {
      messageError(rest.data.data);
    }
  } catch (error) {}
};

export const turunPangkat = (pangkat, pegawai) => async (dispatch) => {
  try {
    const rest = await axios.post(
      `${BASE_URL}/pangkat/turun?pangkat=${pangkat}&pegawai=${pegawai}`
    );
    if (rest.data.status === "Success") {
      messageSuccess("Success");
      dispatch(getPegawai());
    } else {
      messageError(rest.data.data);
    }
  } catch (error) {}
};
