import { GET_CUTI } from "../actions";

const intialState = {
  data: [],
};

const Cuti = (state = intialState, action) => {
  switch (action.type) {
    case GET_CUTI: {
      return {
        ...state,
        data: action.data,
      };
    }
    default:
      return state;
  }
};

export default Cuti;
