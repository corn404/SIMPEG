import axios from "axios";
import moment from "moment";
import { messageError, messageSuccess } from "src/utils";
// import Swal from "sweetalert2";
import { BASE_URL, GET_CUTI } from ".";

export const getCuti = () => async (dispatch) => {
  try {
    const get = await axios.get(`${BASE_URL}/cuti/pegawai`);
    if (get.data.status === "Success") {
      dispatch({ type: GET_CUTI, data: get.data.data });
    }
  } catch (error) {
    messageError("Ada masalah pada server, silahkan hubungi admin");
  }
};

export const AddCuti = (id, tanggal) => async (dispatch) => {
  try {
    const add = await axios.post(`${BASE_URL}/cuti`, {
      id_pegawai: id,
      mulai_cuti: moment(new Date()).format("YYYY-MM-DD"),
      akhir_cuti: tanggal,
    });
    if (add.data.status === "Error") {
      messageError(add.data.data);
    } else {
      messageSuccess(add.data.data);
    }
    dispatch(getCuti());
  } catch (error) {
    messageError("Ada masalah pada server, silahkan hubungi admin");
  }
};

export const DeleteCuti = (id, pegawai) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/cuti?id=${id}&pegawai=${pegawai}`);
    dispatch(getCuti());
  } catch (error) {}
};
