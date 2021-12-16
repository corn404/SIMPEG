import { GET_ABSENSI, GET_ABSENSI_ALL } from "../actions";

const intialState = {
  data: [],
  rekapAll: [],
};

const Absensi = (state = intialState, action) => {
  switch (action.type) {
    case GET_ABSENSI: {
      return {
        ...state,
        data: action.data,
      };
    }

    case GET_ABSENSI_ALL: {
      return {
        ...state,
        rekapAll: action.data,
      };
    }
    default:
      return state;
  }
};

export default Absensi;
