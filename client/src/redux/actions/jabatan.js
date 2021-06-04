import axios from "axios";
import { messageError, messageInfo } from "src/utils";
import Swal from "sweetalert2";
import { BASE_URL, GET_JABATAN } from ".";

export const getJabatan = () => async (dispatch) => {
  try {
    const get = await axios.get(`${BASE_URL}/jabatan`);
    if (get.data.status === "Success") {
      dispatch({ type: GET_JABATAN, data: get.data.data });
    }
  } catch (error) {
    messageError("Ada masalah pada server, silahkan hubungi admin");
  }
};

export const tambahJabatan = (jabatan) => async (dispatch) => {
  try {
    const add = await axios.post(`${BASE_URL}/jabatan`, { jabatan });
    if (add.data.status === "Created") {
      messageInfo("success", "Jabatan berhasil disimpan");
      dispatch(getJabatan());
    }
  } catch (error) {
    messageError("Ada masalah pada server, silahkan hubungi admin");
  }
};

export const hapusJabatan = (id) => async (dispatch) => {
  try {
    const del = await axios.delete(`${BASE_URL}/jabatan/${id}`);
    if (del.data.status === "Deleted") {
      messageInfo("success", "Jabatan berhasil dihapus");
      dispatch(getJabatan());
    }
  } catch (error) {
    messageError("Ada masalah pada server, silahkan hubungi admin");
  }
};
