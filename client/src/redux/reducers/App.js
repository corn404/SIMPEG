import { SET_SIDEBAR } from "../actions";

const intialState = {
  sidebar: true,
  sidebarShow: "responsive",
};

const SideBar = (state = intialState, action) => {
  switch (action.type) {
    case SET_SIDEBAR: {
      return {
        ...state,
        sidebar: action.data,
      };
    }

    case "set":
      return { ...state, sidebarShow: action.sidebarShow };

    default:
      return state;
  }
};

export default SideBar;
