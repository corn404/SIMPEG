import { GET_ABSENSI } from "../actions";

const intialState = {
  data: [],
};

const Absensi = (state = intialState, action) => {
  switch (action.type) {
    case GET_ABSENSI: {
      return {
        ...state,
        data: action.data,
      };
    }
    default:
      return state;
  }
};

export default Absensi;
