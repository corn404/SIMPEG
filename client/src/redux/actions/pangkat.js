import axios from "axios";
import moment from "moment";
import { messageError, messageSuccess } from "src/utils";
// import Swal from "sweetalert2";
import { BASE_URL, GET_MAP_PANGKAT, GET_PANGKAT } from ".";

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
