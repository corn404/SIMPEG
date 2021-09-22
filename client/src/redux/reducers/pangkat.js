import { GET_PANGKAT, GET_MAP_PANGKAT } from "../actions";

const intialState = {
  data: [],
  map: [],
};

const Pangkat = (state = intialState, action) => {
  switch (action.type) {
    case GET_PANGKAT: {
      return {
        ...state,
        data: action.data,
      };
    }

    case GET_MAP_PANGKAT: {
      return {
        ...state,
        map: action.data,
      };
    }
    default:
      return state;
  }
};

export default Pangkat;
