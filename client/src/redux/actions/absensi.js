import axios from "axios";
import { messageError, messageInfo } from "src/utils";
import Swal from "sweetalert2";
import { BASE_URL, GET_ABSENSI } from ".";

export const getAbsensi = () => async (dispatch) => {
  try {
    const get = await axios.get(`${BASE_URL}/absensi`);
    dispatch({ type: GET_ABSENSI, data: get.data.data });
  } catch (error) {
    messageError("Ada masalah pada server, silahkan hubungi admin");
  }
};
