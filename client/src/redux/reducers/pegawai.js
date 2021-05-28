import { GET_PEGAWAI } from "../actions";

const intialState = {
  data: [],
};

const Pegawai = (state = intialState, action) => {
  switch (action.type) {
    case GET_PEGAWAI: {
      return {
        ...state,
        data: action.data,
      };
    }
    default:
      return state;
  }
};

export default Pegawai;
