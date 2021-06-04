import { GET_JABATAN } from "../actions";

const intialState = {
  data: [],
};

const Jabatan = (state = intialState, action) => {
  switch (action.type) {
    case GET_JABATAN: {
      return {
        ...state,
        data: action.data,
      };
    }
    default:
      return state;
  }
};

export default Jabatan;
