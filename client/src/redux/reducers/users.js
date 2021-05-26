import { GET_USERS, USER_LOGIN } from "../actions";

const intialState = {
  data: [],
  currentUser: null,
};

const Users = (state = intialState, action) => {
  switch (action.type) {
    case GET_USERS: {
      return {
        ...state,
        data: action.data,
      };
    }

    case USER_LOGIN: {
      return {
        ...state,
        currentUser: action.data,
      };
    }

    default:
      return state;
  }
};

export default Users;
