import axios from "axios";
import { messageError, messageInfo } from "src/utils";
import Swal from "sweetalert2";
import { BASE_URL, GET_PEGAWAI } from ".";

export const getPegawai = () => async (dispatch) => {
  try {
    const pegawai = await axios.get(`${BASE_URL}/pegawai`);
    dispatch({ type: GET_PEGAWAI, data: pegawai.data.data });
  } catch (error) {
    console.log(error);
  }
};

export const tambahPegawai = (data) => async (dispatch) => {
  try {
    const tambah = await axios.post(`${BASE_URL}/pegawai`, data);
    if (tambah.data.status === "Created") {
      messageInfo("success", "Data pegawai berhasil disimpan");
    }

    if (tambah.data.status === "Error") {
      messageInfo("error", tambah.data.data);
    }

    dispatch(getPegawai());
  } catch (error) {
    console.log(error);
  }
};

export const deletePegawai = (id) => async (dispatch) => {
  try {
    const del = await axios.delete(`${BASE_URL}/pegawai/${id}`);
    if (del.data.status === "Deleted") {
      Swal.fire("Deleted!", "Pegawai berhasil di hapus.", "success");
      dispatch(getPegawai());
    }
  } catch (error) {
    messageError("Ada masalah pada server, silahkan hubungi admin");
  }
};

export const resetPassword = (id, nip) => async (dispatch) => {
  try {
    const reset = await axios.put(`${BASE_URL}/pegawai/reset`, { id, nip });
    if (reset.data.status === "Updated") {
      Swal.fire("Reset Password!", "Password berhasil direset.!", "success");
      dispatch(getPegawai());
    }
  } catch (error) {
    messageError("Ada masalah pada server, silahkan hubungi admin");
  }
};

export const updatePegawai = (data) => async (dispatch) => {
  try {
    const update = await axios.put(`${BASE_URL}/pegawai`, data);
    if (update.data.status === "Updated") {
      Swal.fire("Update!", "berhasil update.!", "success");
      dispatch(getPegawai());
    }
  } catch (error) {
    messageError("Ada masalah pada server, silahkan hubungi admin");
  }
};
