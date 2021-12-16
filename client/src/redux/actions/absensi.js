import axios from "axios";
import { messageError, messageInfo } from "src/utils";
import Swal from "sweetalert2";
import { BASE_URL, GET_ABSENSI, GET_ABSENSI_ALL } from ".";

export const getAbsensi = () => async (dispatch) => {
  try {
    const get = await axios.get(`${BASE_URL}/absensi`);
    dispatch({ type: GET_ABSENSI, data: get.data.data });
  } catch (error) {
    messageError("Ada masalah pada server, silahkan hubungi admin");
  }
};

export const rekapAllAbsensi =
  ({ start, end }, done) =>
  async (dispatch) => {
    try {
      const get = await axios.get(
        `${BASE_URL}/absensi/all?start=${start}&end=${end}`
      );
      dispatch({ type: GET_ABSENSI_ALL, data: get.data.data });
      done(false, get.data.data);
    } catch (error) {
      done(true, []);
      messageError("Ada masalah pada server, silahkan hubungi admin");
    }
  };

export const rekapAbsensiByPegawai =
  ({ start, end, pegawai }, done) =>
  async (dispatch) => {
    try {
      const get = await axios.get(
        `${BASE_URL}/absensi/pegawai?start=${start}&end=${end}&pegawai=${pegawai}`
      );
      // dispatch({ type: GET_ABSENSI_ALL, data: get.data.data });
      done(false, get.data.data);
    } catch (error) {
      done(true, []);
      messageError("Ada masalah pada server, silahkan hubungi admin");
    }
  };
